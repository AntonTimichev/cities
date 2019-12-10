import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";
import leaflet from "leaflet";

import history from "../../history.js";
import SignIn from "../../components/sign-in/sign-in.jsx";
import withPrivateRoute from "../with-private-route/with-private-route.jsx";
import Favorites from "../../components/favorites/favorites.jsx";
import Header from "../../components/header/header.jsx";
import Property from "../../components/property/property.jsx";
import {getIsLoaded} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import withLoginUser from "../with-login-user/with-login-user.jsx";
import {getIsAuth, getUserParams} from "../../reducer/user/selectors.js";
import withDetails from "../with-details/with-details.jsx";

const WithPrivateRoute = withPrivateRoute(Favorites);
const SignInWrapped = withLoginUser(SignIn);
const PropertyWrapped = withDetails(Property);

const withSwitchPages = (Component) => {
  class WithSwitchPages extends PureComponent {

    render() {
      const {isLoaded, setUser, isAuth, userParams} = this.props;
      return isLoaded &&
      <Router history={history}>
        <Header user={userParams} />
        <Switch>
          <Route path="/" exact render={() => <Component {...this.props} leaflet={leaflet} />} />
          <Route path="/login" render={() => isAuth ? <Redirect to='/' /> : <SignInWrapped setUser={setUser} />} />
          <Route path="/offer/:id" render={(props) => <PropertyWrapped {...props} leaflet={leaflet} />} />
          <WithPrivateRoute path="/favorite" isAuth={isAuth} />
        </Switch>
      </Router>;
    }
  }

  WithSwitchPages.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
    userParams: PropTypes.object.isRequired
  };

  return WithSwitchPages;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isLoaded: getIsLoaded(state),
  isAuth: getIsAuth(state),
  userParams: getUserParams(state)
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => {
    dispatch(UserOperation.authenticateUser(user));
  }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withSwitchPages);
