
const initialState = {
  reviews: [],
  postingReviewStatus: false,
  reviewError: false,
};

const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  POSTING_REVIEW_STATUS: `POSTING_REVIEW_STATUS`,
  REVIEW_ERROR: `REVIEW_ERROR`,
};

const Operation = {
  loadReviews: (id) => async (dispatch, _getState, apiProvider) => {
    try {
      const reviews = await apiProvider.loadReviews(id);
      dispatch(ActionCreator.loadReviews(reviews));
    } catch (_e) {
      dispatch(ActionCreator.loadReviews([]));
    }
  },

  postReview: (review, id) => async (dispatch, _getState, apiProvider) => {
    try {
      const reviews = await apiProvider.postReview(id, review);
      dispatch(ActionCreator.reviewError(false));
      dispatch(ActionCreator.postingReviewStatus(true));
      dispatch(ActionCreator.loadReviews(reviews));
    } catch (_e) {
      dispatch(ActionCreator.reviewError(true));
    }
  }
};

const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),

  postingReviewStatus: (bool) => ({
    type: ActionType.POSTING_REVIEW_STATUS,
    payload: bool
  }),

  reviewError: (bool) => ({
    type: ActionType.REVIEW_ERROR,
    payload: bool
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });

    case ActionType.POSTING_REVIEW_STATUS:
      return Object.assign({}, state, {
        postingReviewStatus: action.payload
      });

    case ActionType.REVIEW_ERROR:
      return Object.assign({}, state, {
        reviewError: action.payload
      });
  }
  return state;
};

export {
  Operation,
  ActionCreator,
  ActionType,
  reducer,
};
