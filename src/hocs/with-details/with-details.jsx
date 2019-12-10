import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import {Operation as ReviewOperation, ActionCreator as ReviewActionCreator} from "../../reducer/review/review.js";
import {getOfferData, getNearOffers, getNearOffersCoords} from "../../reducer/data/selectors.js";
import {getCurrentReviews, getPostingReviewStatus, getReviewError} from "../../reducer/review/selectors.js";

const withDetails = (Component) => {
  class WithDetails extends PureComponent {

    componentDidUpdate(prevProps) {
      const {offerData} = this.props;
      if (prevProps.offerData.id !== offerData.id) {
        this._refreshProperty();
      }
    }

    componentDidMount() {
      this._refreshProperty();
    }

    render() {
      return <Component
        {... this.props}
      />;
    }

    _refreshProperty() {
      const {loadReviews, changeReviewError} = this.props;
      changeReviewError(false);
      loadReviews();
      window.scrollTo(0, 0);
    }
  }

  WithDetails.propTypes = {
    offerData: PropTypes.object.isRequired,
    loadReviews: PropTypes.func.isRequired,
    changeReviewError: PropTypes.func.isRequired
  };

  return WithDetails;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offerData: getOfferData(state, Number(ownProps.match.params.id)),
  reviews: getCurrentReviews(state),
  postingReviewStatus: getPostingReviewStatus(state),
  nearOffers: getNearOffers(state, Number(ownProps.match.params.id)),
  mappedCoords: getNearOffersCoords(state, Number(ownProps.match.params.id)),
  reviewError: getReviewError(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadReviews: () => {
    dispatch(ReviewOperation.loadReviews(Number(ownProps.match.params.id)));
  },
  postReview: (review) => {
    dispatch(ReviewOperation.postReview(review, Number(ownProps.match.params.id)));
  },
  changeReviewStatus: (bool) => {
    dispatch(ReviewActionCreator.postingReviewStatus(bool));
  },
  changeReviewError: (bool) => {
    dispatch(ReviewActionCreator.reviewError(bool));
  }
});

export {withDetails};
export default compose(connect(mapStateToProps, mapDispatchToProps), withDetails);
