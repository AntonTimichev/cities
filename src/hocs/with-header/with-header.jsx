import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import Header from "../../components/header/header.jsx";

import history from "../../history.js";
import {setClassForBody} from "../../utils.js";
import {getUserParams} from "../../reducer/user/selectors";


const withHeader = (Component) => {
  class WithHeader extends PureComponent {

    render() {
      setClassForBody(history.location);
      const {userParams} = this.props;
      return <React.Fragment>
        <Header userParams={userParams} />
        <Component
          {...this.props}
        />
      </React.Fragment>;
    }
  }

  WithHeader.propTypes = {
    userParams: PropTypes.object.isRequired
  };

  return WithHeader;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userParams: getUserParams(state)
});

export {withHeader};
export default compose(connect(mapStateToProps), withHeader);
