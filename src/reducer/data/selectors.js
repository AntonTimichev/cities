import {createSelector} from "reselect";

import NameSpaces from "../name-spaces.js";
import {createSorter} from "../../utils.js";
import {sortingParams, optionsOfSorting} from "../../apperance.js";

const NAME_SPACE = NameSpaces.DATA;
const getMappedCoords = (offers) => offers.map((offer) => ({
  id: offer.id,
  position: [offer.location.latitude, offer.location.longitude]
}));
const getKeySorting = (state) => state[NAME_SPACE].keySorting;

export const getData = (state) => state[NAME_SPACE].data;
export const getOfferData = (state, id) => state[NAME_SPACE].data.find((offer) => offer.id === id);
export const getIsLoaded = (state) => state[NAME_SPACE].isLoaded;
export const getCurrentCityName = (state, id) =>
  id
    ? getOfferData(state, id).city.name
    : state[NAME_SPACE].currentCity;

export const getCurrentCityLocation = createSelector(
    getCurrentCityName,
    getData,
    (name, data) => {
      const currentOffer = data.find((offer) => offer.city.name === name);
      return currentOffer.city.location;
    }
);
export const getCityNames = createSelector(
    getData,
    (data) => [...new Set(data.map((offer) => offer.city.name))].sort()
);
export const getCurrentCityOffers = createSelector(
    getCurrentCityName,
    getData,
    (name, data) => data.filter((offer) => offer.city.name === name)
);
export const getCityOffersCoords = createSelector(
    getCurrentCityOffers,
    getMappedCoords
);
export const getNearOffers = createSelector(
    getOfferData,
    getCurrentCityOffers,
    (currentOffer, offers) => {
      const {location} = currentOffer;
      const distances = offers.map((offer) => {
        const offerX = offer.location.latitude;
        const offerY = offer.location.longitude;
        const currentOfferX = location.latitude;
        const currentOfferY = location.longitude;
        const deltaX = Math.abs(currentOfferX - offerX);
        const deltaY = Math.abs(currentOfferY - offerY);
        return {
          offer,
          distance: Math.hypot(deltaX, deltaY)
        };
      });
      const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
      const nearOffers = sortedDistances.map((item) => item.offer);
      return nearOffers.length > 4 ? nearOffers.slice(0, 4) : nearOffers;
    }
);
export const getNearOffersCoords = createSelector(
    getNearOffers,
    getMappedCoords
);
export const getCurrentOption = (state) => optionsOfSorting[getKeySorting(state)];
export const getSortedOffers = createSelector(
    getCurrentCityOffers,
    getKeySorting,
    (offers, key) => sortingParams[key] ? [...offers].sort(createSorter(sortingParams[key])) : offers
);
export const getLoadingErrorOffers = (state) => state[NAME_SPACE].loadingErrorOffers;
