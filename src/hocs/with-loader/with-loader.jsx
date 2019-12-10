import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withLoader = (Component) => {
  class WithLoader extends PureComponent {
    render() {
      const {isLoaded, ...props} = this.props;
      if (isLoaded) {
        return <Component
          {...props}
        />;
      }
      return null;
    }
  }

  WithLoader.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
  };

  return WithLoader;
};

export default withLoader;
