import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {setClassForBody} from "../../utils";
import {bodyClasses} from "../../Apperance";

const withPrivateRoute = (Component) => {
  class WithPrivateRoute extends PureComponent {
    render() {
      const {path, isAuth, classKey} = this.props;
      return <Route path={path} render={() => {
        setClassForBody(bodyClasses[classKey]);
        return isAuth
          ? <Component />
          : <Redirect to='/login' />;
      }
      } />;
    }
  }

  WithPrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    classKey: PropTypes.string.isRequired
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
