import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import {getIsLoaded} from "../../reducer/data/selectors";

const withLoader = (Component) => {
  class WithLoader extends PureComponent {
    render() {
      const {isLoaded} = this.props;
      if (isLoaded) {
        return <Component
          {...this.props}
        />;
      }
      return <div>Loading...</div>;
    }
  }

  WithLoader.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
  };

  return WithLoader;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isLoaded: getIsLoaded(state),
});

export {withLoader};
export default compose(
    connect(mapStateToProps),
    withLoader
);
