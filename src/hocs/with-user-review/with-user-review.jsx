import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withReviewUser = (Component) => {
  class WithReviewUser extends PureComponent {
    constructor(props) {
      super(props);
      this._form = React.createRef();
      this._btnSubmit = React.createRef();
      this.state = {
        rating: ``,
        comment: ``,
        isValidForm: false
      };

      this._handleRatingClick = this._handleRatingClick.bind(this);
      this._handleTextAreaInput = this._handleTextAreaInput.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {id, reviewError, postingReviewStatus, changeReviewStatus} = this.props;
      if ((prevProps.id !== id) || (postingReviewStatus && !reviewError)) {
        this.setState((_prevState) => {
          return {
            rating: ``,
            comment: ``,
            isValidForm: false
          };
        });
        this._form.current.reset();
        this._btnSubmit.current.disabled = true;
        changeReviewStatus(false);
      }
    }

    render() {
      const {isValidForm} = this.state;
      return <Component
        {...this.props}
        refForm={this._form}
        refBtnSubmit={this._btnSubmit}
        isSubmit={!isValidForm}
        onRatingClick={this._handleRatingClick}
        onFormSubmit={this._handleFormSubmit}
        onTextAreaInput={this._handleTextAreaInput}
      />;
    }

    _handleFormSubmit() {
      const {postReview} = this.props;
      const {rating, comment} = this.state;
      postReview({rating, comment});
    }

    _handleTextAreaInput({target: {value}}) {
      if (value.length < 50 || value.length > 200) {
        value = ``;
      }
      this.setState((prevState) => {
        const {rating} = prevState;
        return {
          comment: value,
          isValidForm: value && !!rating
        };
      });
    }

    _handleRatingClick({target: {value}}) {
      if (value) {
        this.setState((prevState) => {
          const {comment} = prevState;
          return {
            rating: value,
            isValidForm: !!comment
          };
        });
      }
    }
  }

  WithReviewUser.propTypes = {
    id: PropTypes.number.isRequired,
    postReview: PropTypes.func.isRequired,
    reviewError: PropTypes.bool.isRequired,
    postingReviewStatus: PropTypes.bool.isRequired,
    changeReviewStatus: PropTypes.func.isRequired
  };

  return WithReviewUser;
};

export default withReviewUser;
