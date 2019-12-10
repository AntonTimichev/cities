import {getFavorites} from "./selectors.js";

const initialState = {
  favorites: [],
  favoriteError: -1,
  loadingErrorFavorites: ``,
  isLoadedFavorites: false,
  isPostedOffer: false
};

const ActionType = {
  CHANGE_FAVORITES: `CHANGE_FAVORITES`,
  FAVORITE_ERROR: `FAVORITE_ERROR`,
  LOADING_ERROR_FAVORITES: `LOADING_ERROR_FAVORITES`,
  IS_LOADED_FAVORITES: `IS_LOADED_FAVORITES`,
  IS_POSTED_OFFER: `IS_POSTED_OFFER`
};

const Operation = {
  postFavorite: (path, id, isAdding) => async (dispatch, getState, apiProvider) => {
    let favorites = getFavorites(getState());
    try {
      const data = await apiProvider.postFavorite(path, id, isAdding);
      if (isAdding) {
        favorites.push(data);
      } else {
        const index = favorites.findIndex((item) => data.id === item.id);
        if (index !== -1) {
          favorites.splice(index, 1);
        }
      }
      dispatch(ActionCreator.favoriteError(-1));
      dispatch(ActionCreator.changeFavorites(favorites));
      dispatch(ActionCreator.changeIsPostedOffer(true));
    } catch (e) {
      if (e) {
        dispatch(ActionCreator.favoriteError(id));
      }
    }
  },

  loadFavorites: (isLoaded) => async (dispatch, getState, apiProvider) => {
    try {
      let favorites = isLoaded
        ? getFavorites(getState())
        : await apiProvider.loadFavorites();
      dispatch(ActionCreator.loadingErrorFavorites(``));
      dispatch(ActionCreator.changeFavorites(favorites));
      dispatch(ActionCreator.loadFavoritesComplete(true));
      return true;
    } catch ({message}) {
      dispatch(ActionCreator.loadingErrorFavorites(message || `Error`));
      return true;
    }
  }
};

const ActionCreator = {
  changeFavorites: (data) => ({
    type: ActionType.CHANGE_FAVORITES,
    payload: data
  }),

  favoriteError: (errorId) => ({
    type: ActionType.FAVORITE_ERROR,
    payload: errorId
  }),

  loadingErrorFavorites: (err) => ({
    type: ActionType.LOADING_ERROR_FAVORITES,
    payload: err
  }),

  loadFavoritesComplete: (bool) => ({
    type: ActionType.IS_LOADED_FAVORITES,
    payload: bool
  }),

  changeIsPostedOffer: (bool) => ({
    type: ActionType.IS_POSTED_OFFER,
    payload: bool
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.payload
      });

    case ActionType.FAVORITE_ERROR:
      return Object.assign({}, state, {
        favoriteError: action.payload
      });

    case ActionType.LOADING_ERROR_FAVORITES:
      return Object.assign({}, state, {
        loadingErrorFavorites: action.payload
      });

    case ActionType.IS_LOADED_FAVORITES:
      return Object.assign({}, state, {
        isLoadedFavorites: action.payload
      });

    case ActionType.IS_POSTED_OFFER:
      return Object.assign({}, state, {
        isPostedOffer: action.payload
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
