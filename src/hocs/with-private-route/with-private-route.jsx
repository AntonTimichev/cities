import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

const withPrivateRoute = (Component) => {
  class WithPrivateRoute extends PureComponent {

    render() {
      const {isAuth} = this.props;
      return isAuth
        ? <Component
          {...this.props}
        />
        : <Redirect to='/login' />;
    }
  }

  WithPrivateRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
