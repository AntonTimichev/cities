const initialState = {
  currentCity: ``,
  data: [],
  isLoaded: false
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMPLETE: `LOAD_COMPLETE`
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    api.get(`/hotels`)
      .then((data) => {
        dispatch(ActionCreator.loadOffers(data));
        dispatch(ActionCreator.loadComplete());
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
  }
  return state;
};

export {
  Operation,
  ActionCreator,
  ActionType,
  reducer,
};
