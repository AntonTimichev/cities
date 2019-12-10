import NameSpaces from "../name-spaces.js";

const NAME_SPACE = NameSpaces.REVIEW;

export const getPostingReviewStatus = (state) => state[NAME_SPACE].postingReviewStatus;
export const getCurrentReviews = (state) => state[NAME_SPACE].reviews;
export const getReviewError = (state) => state[NAME_SPACE].reviewError;
