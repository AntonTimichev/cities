import NameSpaces from "../name-spaces.js";

const NAME_SPACE = NameSpaces.FAVORITES;

export const getFavorites = (state) => state[NAME_SPACE].favorites;

export const getIsFavoritesEmpty = (state) => state[NAME_SPACE].favorites.length === 0;

export const getFavoriteIdError = (state) => state[NAME_SPACE].favoriteError;

export const getLoadingErrorFavorites = (state) => state[NAME_SPACE].loadingErrorFavorites;

export const getFavoritesAmount = (state) => state[NAME_SPACE].favorites.length;

export const getIsPostedOffer = (state) => state[NAME_SPACE].isPostedOffer;

export const getIsLoadedFavorites = (state) => state[NAME_SPACE].isLoadedFavorites;

export const getFavoritesData = (state) => {
  const offers = getFavorites(state);
  const data = {};
  if (!offers.length) {
    return {};
  }
  offers.forEach((offer) => {
    if (offer.isFavorite) {
      if (data[offer.city.name]) {
        data[offer.city.name].push(offer);
      } else {
        data[offer.city.name] = [offer];
      }
    }
  });
  return Object.entries(data).sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });
};
