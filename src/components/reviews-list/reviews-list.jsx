import React from "react";
import PropTypes from "prop-types";

import ReviewItem from "../review-item/review-item.jsx";

const ReviewsList = ({reviews}) => {
  const sortedReviews = reviews.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return <ul className="reviews__list">
    {sortedReviews.map((review, i) => <ReviewItem key={i} review={review} />)}
  </ul>;
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ReviewsList;
