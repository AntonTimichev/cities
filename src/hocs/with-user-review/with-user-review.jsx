import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withReviewUser = (Component) => {
  class WithReviewUser extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rating: ``,
        comment: ``
      };

      this._handleRatingClick = this._handleRatingClick.bind(this);
      this._handleInputBlur = this._handleInputBlur.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        onRatingClick={this._handleRatingClick}
        onFormSubmit={this._handleFormSubmit}
        onInputBlur={this._handleInputBlur}
      />;
    }

    _handleFormSubmit() {
      const {postReview} = this.props;
      const {rating, comment} = this.state;
      if (rating && comment) {
        postReview({rating, comment});
      }
    }

    _handleInputBlur(e) {
      let {value} = e.target;
      if (!value || value.length < 50) {
        return;
      }
      if (value.length > 200) {
        value = value.slice(0, 200);
      }
      this.setState({comment: value});
    }

    _handleRatingClick(e) {
      this.setState({rating: e.target.value});
    }
  }

  WithReviewUser.propTypes = {
    postReview: PropTypes.func.isRequired
  };

  return WithReviewUser;
};

export default withReviewUser;
