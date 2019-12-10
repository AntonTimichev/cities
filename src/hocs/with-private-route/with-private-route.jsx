import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
// import {connect} from "react-redux";
// import {compose} from "recompose";
//
// import {getIsAuth} from "../../reducer/user/selectors";

const withPrivateRoute = (Component) => {
  class WithPrivateRoute extends PureComponent {

    render() {
      const {isAuth} = this.props;
      return isAuth
        ? <Component />
        : <Redirect to='/login' />;
    }
  }

  WithPrivateRoute.propTypes = {
    isAuth: PropTypes.bool.isRequired
  };

  return WithPrivateRoute;
};

// const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
//   isAuth: getIsAuth(state)
// });

export default withPrivateRoute;
// export default compose(connect(mapStateToProps), withPrivateRoute);
