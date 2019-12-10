import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "recompose";

import {getOfferData, getCurrentReviews, getNearOffers, getNearOffersCoords} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";


const withDetails = (Component) => {
  class WithDetails extends PureComponent {

    componentDidMount() {
      const {getReviews} = this.props;
      getReviews();
    }

    render() {
      return <Component
        {... this.props}
      />;
    }
  }

  WithDetails.propTypes = {
    offerData: PropTypes.object.isRequired,
    reviews: PropTypes.array.isRequired,
    mappedCoords: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.array.isRequired
    })),
    nearOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
    getReviews: PropTypes.func.isRequired
  };


  return WithDetails;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offerData: getOfferData(state, Number(ownProps.match.params.id)),
  reviews: getCurrentReviews(state),
  nearOffers: getNearOffers(state, Number(ownProps.match.params.id)),
  mappedCoords: getNearOffersCoords(state, Number(ownProps.match.params.id))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getReviews: () => {
    dispatch(DataOperation.loadReviews(Number(ownProps.match.params.id)));
  },
  postReview: (review) => {
    dispatch(DataOperation.postReview(review, Number(ownProps.match.params.id)));
  },
  addToFavorites: (path) => {
    dispatch(DataOperation.addToFavorites(path));
  }
});

export {withDetails};
export default compose(connect(mapStateToProps, mapDispatchToProps), withDetails);
