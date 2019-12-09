import {offers} from "./mocks/offers";

const initialState = {
  currentCity: `Amsterdam`,
  offers: offers[`Amsterdam`],
  cities: Object.keys(offers)
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  getOffers: (cityName) => ({
    type: ActionType.GET_OFFERS,
    payload: offers[cityName],
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload,
      });

    case ActionType.GET_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload,
      });
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  reducer,
};
