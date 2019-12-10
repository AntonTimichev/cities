import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

const withPrivateRoute = (Component) => {
  class WithPrivateRoute extends PureComponent {
    render() {
      const {path, isAuth} = this.props;
      return <Route path={path} render={() => (
        isAuth
          ? <Component />
          : <Redirect to='/login' />
      )} />;
    }
  }

  WithPrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
