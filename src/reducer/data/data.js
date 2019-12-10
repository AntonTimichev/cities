import ModelOffer from "../../model-offer.js";

const initialState = {
  currentCity: ``,
  data: [],
  isLoaded: false,
  currentOfferId: null
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMPLETE: `LOAD_COMPLETE`,
  SET_CURRENT_OFFER_ID: `GET_OFFER_DATA`
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    api.get(`/hotels`)
      .then((response) => {
        const parsedData = ModelOffer.parseToOffers(response.data);
        dispatch(ActionCreator.loadOffers(parsedData));
        return parsedData;
      })
      .then((data) => {
        const sortedData = [...new Set(data.map((offer) => offer.city.name))].sort();
        dispatch(ActionCreator.setCurrentCity(sortedData[0]));
      })
      .then(() => dispatch(ActionCreator.loadComplete()));
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

  setCurrentOfferId: (id) => ({
    type: ActionType.SET_CURRENT_OFFER_ID,
    payload: id
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

    case ActionType.SET_CURRENT_OFFER_ID:
      return Object.assign({}, state, {
        currentOfferId: action.payload
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
