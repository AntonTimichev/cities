import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";
import leaflet from "leaflet";

import SignIn from "../../components/sign-in/sign-in.jsx";
import Favorites from "../../components/favorites/favorites.jsx";
import Property from "../../components/property/property.jsx";
import ErrorComponent from "../../components/error-component/error-component.jsx";
import withLoginUser from "../with-login-user/with-login-user.jsx";
import withPrivateRoute from "../with-private-route/with-private-route.jsx";
import withHeader from "../with-header/with-header.jsx";
import withFavorites from "../with-favorites/with-favorites.jsx";
import withDetails from "../with-details/with-details.jsx";

import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {ActionCreator as FavoriteActionCreator} from "../../reducer/favorites/favorites.js";
import {getIsAuth, getIsLogin, getUserParams, getLoginErrorStatus} from "../../reducer/user/selectors.js";
import {getIsLoaded, getCurrentCityName, getLoadingErrorOffers} from "../../reducer/data/selectors.js";
import {getFavoriteIdError, getFavoritesAmount, getIsPostedOffer} from "../../reducer/favorites/selectors.js";

import history from "../../history.js";
import {paths} from "../../apperance.js";
import {Operation as FavoritesOperation} from "../../reducer/favorites/favorites.js";

const WithPrivateRoute = withHeader(withPrivateRoute(withFavorites(Favorites)));
const SignInWrapped = withHeader(withLoginUser(SignIn));
const PropertyWrapped = withHeader(withDetails(Property));

const withSwitchPages = (Component) => {
  class WithSwitchPages extends PureComponent {

    componentDidUpdate(prevProps) {
      const {
        userParams,
        loadOffers,
        changeLoadComplete,
        isLogin,
        refreshOffers,
        checkAuth,
        loadingErrorOffers,
        isPostedOffer,
        changeIsPostedOffer} = this.props;

      if (prevProps.userParams.id !== userParams.id && isLogin) {
        history.push(`/`);
        changeLoadComplete(false);
        loadOffers();
      }
      if (prevProps.userParams.id !== userParams.id && userParams.id === -1 && !isLogin) {
        refreshOffers({isFavorite: false});
      }
      if (userParams.id !== -1 && isPostedOffer) {
        changeIsPostedOffer(false);
        refreshOffers();
      }
      if (prevProps.loadingErrorOffers !== loadingErrorOffers && !loadingErrorOffers) {
        checkAuth();
      }
    }

    render() {
      const {
        isLoaded,
        isAuth,
        currentCity,
        changeCurrentCity,
        loadingErrorOffers,
        idError,
        postFavorite,
        loadOffers,
        loginErrorStatus,
        loginError,
        loginUser} = this.props;

      if (loadingErrorOffers) {
        return <ErrorComponent
          errorMessage={loadingErrorOffers}
          reLoadData={loadOffers}
        />;
      }
      if (!isLoaded) {
        return null;
      }
      return <Router history={history}>
        <Switch>
          <Route
            path={paths.main}
            exact
            render={() => <Component
              leaflet={leaflet}
              idError={idError}
              onCityNameClick={changeCurrentCity}
              onFavoriteBtnClick={postFavorite}
            />}
          />
          <Route
            path={paths.login}
            render={(props) => <SignInWrapped
              {...props}
              loginErrorStatus={loginErrorStatus}
              loginError={loginError}
              loginUser={loginUser}
              currentCity={currentCity}
              isAuth={isAuth}
            />}
          />
          <Route
            path={paths.offerId}
            render={(props) => <PropertyWrapped
              {...props}
              leaflet={leaflet}
              isAuth={isAuth}
              idError={idError}
              onFavoriteBtnClick={postFavorite}
            />}
          />
          <Route
            path={paths.private.favorite}
            render={() => <WithPrivateRoute
              isAuth={isAuth}
              idError={idError}
              onCityNameClick={changeCurrentCity}
              onFavoriteBtnClick={postFavorite}
            />}
          />
          <Route
            path={paths.other}
            render={() => <Component
              leaflet={leaflet}
              idError={idError}
              onCityNameClick={changeCurrentCity}
              onFavoriteBtnClick={postFavorite}
            />}
          />
        </Switch>
      </Router>;
    }
  }

  WithSwitchPages.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    currentCity: PropTypes.string.isRequired,
    userParams: PropTypes.object.isRequired,
    changeLoadComplete: PropTypes.func.isRequired,
    loadOffers: PropTypes.func.isRequired,
    loadingErrorOffers: PropTypes.string.isRequired,
    loginUser: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
    loginError: PropTypes.func.isRequired,
    loginErrorStatus: PropTypes.bool.isRequired,
    idError: PropTypes.number.isRequired,
    favoriteAmount: PropTypes.number.isRequired,
    refreshOffers: PropTypes.func.isRequired,
    changeCurrentCity: PropTypes.func.isRequired,
    postFavorite: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    changeIsPostedOffer: PropTypes.func.isRequired,
    isPostedOffer: PropTypes.bool.isRequired
  };

  return WithSwitchPages;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isLoaded: getIsLoaded(state),
  isAuth: getIsAuth(state),
  currentCity: getCurrentCityName(state),
  userParams: getUserParams(state),
  isLogin: getIsLogin(state),
  loadingErrorOffers: getLoadingErrorOffers(state),
  loginErrorStatus: getLoginErrorStatus(state),
  idError: getFavoriteIdError(state),
  favoriteAmount: getFavoritesAmount(state),
  isPostedOffer: getIsPostedOffer(state)
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => {
    dispatch(UserOperation.loginUser(user));
  },
  loadOffers: () => {
    dispatch(DataOperation.loadOffers());
  },
  refreshOffers: (newParams = null) => {
    dispatch(DataOperation.refreshOffers(newParams));
  },
  loginError: (bool) => {
    dispatch(UserActionCreator.loginError(bool));
  },
  changeLoadComplete: (bool) => {
    dispatch(DataActionCreator.loadComplete(bool));
  },
  postFavorite: (path, id, isAdding) => {
    dispatch(FavoritesOperation.postFavorite(path, id, isAdding));
  },
  changeCurrentCity: (cityName) => {
    dispatch(DataActionCreator.setCurrentCity(cityName));
  },
  checkAuth: () => {
    dispatch(UserOperation.checkAuth());
  },
  changeIsPostedOffer: (bool) => {
    dispatch(FavoriteActionCreator.changeIsPostedOffer(bool));
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withSwitchPages);
