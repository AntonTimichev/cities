import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";
import leaflet from "leaflet";

import history from "../../history.js";
import SignIn from "../../components/sign-in/sign-in.jsx";
import withPrivateRoute from "../with-private-route/with-private-route.jsx";
import withHeader from "../with-header/with-header.jsx";
import Favorites from "../../components/favorites/favorites.jsx";
import Property from "../../components/property/property.jsx";
import {getIsLoaded} from "../../reducer/data/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import withLoginUser from "../with-login-user/with-login-user.jsx";
import {getIsAuth, getUserParams} from "../../reducer/user/selectors.js";
import withDetails from "../with-details/with-details.jsx";
import {paths} from "../../apperance.js";

const WithPrivateRoute = withHeader(withPrivateRoute(Favorites));
const SignInWrapped = withHeader(withLoginUser(SignIn));
const PropertyWrapped = withHeader(withDetails(Property));

const withSwitchPages = (Component) => {
  class WithSwitchPages extends PureComponent {
    constructor(props) {
      super(props);

      this._handleLoginUser = this._handleLoginUser.bind(this);
    }

    render() {
      const {isLoaded, isAuth, userParams} = this.props;
      return isLoaded &&
      <Router history={history}>
        <Switch>
          <Route
            path={paths.main}
            exact
            render={() => <Component leaflet={leaflet} userParams={userParams} />}
          />
          <Route
            path={paths.login}
            render={(props) => <SignInWrapped {...props} loginUser={this._handleLoginUser} isAuth={isAuth} userParams={userParams} />}
          />
          <Route
            path={paths.offerId}
            render={(props) => <PropertyWrapped {...props} leaflet={leaflet} isAuth={isAuth} userParams={userParams} />}
          />
          <Route
            path={paths.private.favorite}
            render={() => <WithPrivateRoute path={paths.private.favorite} isAuth={isAuth} userParams={userParams} />}
          />
          <Route
            path={paths.other}
            render={() => <Component leaflet={leaflet} userParams={userParams} />}
          />
        </Switch>
      </Router>;
    }

    _handleLoginUser(user) {
      const {loginUser} = this.props;
      loginUser(user);
    }
  }

  WithSwitchPages.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
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
  loginUser: (user) => dispatch(UserOperation.loginUser(user, history))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withSwitchPages);
