
const initialState = {
  currentCity: ``,
  data: [],
  isLoaded: false,
  keySorting: 0,
  loadingErrorOffers: ``
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMPLETE: `LOAD_COMPLETE`,
  SET_KEY_SORTING: `SET_KEY_SORTING`,
  GET_FAVORITES: `GET_FAVORITES`,
  LOADING_ERROR_OFFERS: `LOADING_ERROR_OFFERS`
};

const Operation = {
  loadOffers: () => async (dispatch, _getState, apiProvider) => {
    try {
      const {data, cityNames} = await apiProvider.loadOffers();
      dispatch(ActionCreator.loadingErrorOffers(``));
      dispatch(ActionCreator.loadOffers(data));
      dispatch(ActionCreator.setCurrentCity(cityNames[0]));
      dispatch(ActionCreator.loadComplete(true));
    } catch ({message}) {
      dispatch(ActionCreator.loadingErrorOffers(message || `Error`));
    }
  },

  refreshOffers: (newParams) => (dispatch, _getState, apiProvider) => {
    const offers = apiProvider.refreshOffers(newParams);
    dispatch(ActionCreator.loadOffers(offers));
  },

  syncOffers: () => async (dispatch, _getState, apiProvider) => {
    const data = await apiProvider.syncOffers();
    dispatch(ActionCreator.loadOffers(data));
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

  loadComplete: (bool) => ({
    type: ActionType.LOAD_COMPLETE,
    payload: bool
  }),

  setKeySorting: (key) => ({
    type: ActionType.SET_KEY_SORTING,
    payload: key
  }),

  loadingErrorOffers: (message) => ({
    type: ActionType.LOADING_ERROR_OFFERS,
    payload: message
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

    case ActionType.SET_KEY_SORTING:
      return Object.assign({}, state, {
        keySorting: action.payload
      });

    case ActionType.LOADING_ERROR_OFFERS:
      return Object.assign({}, state, {
        loadingErrorOffers: action.payload
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
