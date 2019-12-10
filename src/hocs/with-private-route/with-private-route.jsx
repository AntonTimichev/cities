import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";

import {getIsAuth} from "../../reducer/user/selectors";

const withPrivateRoute = () => {
  class WithPrivateRoute extends PureComponent {
    render() {
      const {path, component: Component, isAuth} = this.props;
      return <Route path={path} render={() => (
        isAuth
          ? <Component />
          : <Redirect to='/login' />
      )} />;
    }
  }

  WithPrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
  };

  return WithPrivateRoute;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuth: getIsAuth(state)
});

export {withPrivateRoute};
export default compose(connect(mapStateToProps), withPrivateRoute);
