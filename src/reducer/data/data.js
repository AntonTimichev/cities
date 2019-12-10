import OfferModel from "../../data-models/offer-model.js";
import ReviewModel from "../../data-models/review-model.js";
import {getRandomInteger} from "../../utils.js";

const initialState = {
  currentCity: ``,
  data: [],
  isLoaded: false,
  keySorting: 0,
  reviews: []
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMPLETE: `LOAD_COMPLETE`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SET_KEY_SORTING: `SET_KEY_SORTING`
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    api.get(`/hotels`)
      .then((response) => {
        const parsedData = OfferModel.parseToOffers(response.data);
        dispatch(ActionCreator.loadOffers(parsedData));
        return parsedData;
      })
      .then((data) => {
        data = [...new Set(data.map((offer) => offer.city.name))];
        dispatch(ActionCreator.setCurrentCity(data[getRandomInteger(0, data.length - 1)]));
      })
      .then(() => dispatch(ActionCreator.loadComplete()));
  },
  loadReviews: (id) => (dispatch, _getState, api) => {
    api.get(`comments/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const parsedData = ReviewModel.parseToReviews(response.data);
          dispatch(ActionCreator.loadReviews(parsedData));
        }
      })
      .catch(() => dispatch(ActionCreator.loadReviews([])));
  },
  postReview: (data, id) => (dispatch, _getState, api) => {
    api.post(`/comments/${id}`, data)
      .then((response) => {
        if (response.status === 200) {
          const parsedData = ReviewModel.parseToReviews(response.data);
          dispatch(ActionCreator.loadReviews(parsedData));
        }
      });
  }
};

const ActionCreator = {
  setCurrentCity: (cityName) => ({
    type: ActionType.SET_CURRENT_CITY,
    payload: cityName,
  }),

  loadOffers: (data) => ({
    type: ActionType.LOAD_OFFERS,
    payload: data,
  }),

  loadComplete: () => ({
    type: ActionType.LOAD_COMPLETE,
    payload: true
  }),

  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),

  setKeySorting: (key) => ({
    type: ActionType.SET_KEY_SORTING,
    payload: key
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload,
      });

    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        data: action.payload,
      });

    case ActionType.LOAD_COMPLETE:
      return Object.assign({}, state, {
        isLoaded: action.payload
      });

    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload
      });

    case ActionType.SET_KEY_SORTING:
      return Object.assign({}, state, {
        keySorting: action.payload
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
