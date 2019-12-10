import React from "react";
import PropTypes from "prop-types";

import ReviewItem from "../review-item/review-item.jsx";

const ReviewsList = ({reviews}) => {
  return <ul className="reviews__list">
    {reviews.map((review, i) => <ReviewItem key={i} review={review} />)}
  </ul>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ReviewsList;
