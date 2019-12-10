import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import history from "../../history.js";
import Header from "../../components/header/header.jsx";
import {setClassForBody} from "../../utils";

const withHeader = (Component) => {
  class WithHeader extends PureComponent {
    constructor(props) {
      super(props);
    }

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

export default withHeader;
