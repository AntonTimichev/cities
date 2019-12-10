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
      const {rating, comment} = this.state;
      return <Component
        {...this.props}
        isSubmit={!(rating && comment)}
        onRatingClick={this._handleRatingClick}
        onFormSubmit={this._handleFormSubmit}
        onInputBlur={this._handleInputBlur}
      />;
    }

    _handleFormSubmit(form) {
      const {postReview} = this.props;
      const {rating, comment} = this.state;
      if (rating && comment) {
        this.setState({comment: ``, rating: ``}, () => {
          postReview({rating, comment});
          form.reset();
        });
      }
    }

    _handleInputBlur(e) {
      let {value} = e.target;
      this.setState({comment: value}, () => {
        if (!value || value.length < 50) {
          this.setState({comment: ``});
        }
        if (value.length > 200) {
          value = value.slice(0, 200);
        }
      });
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
