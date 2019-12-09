import {createSelector} from 'reselect';

import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;
const getData = (state) => state[NAME_SPACE].data;

export const getIsLoaded = (state) => state[NAME_SPACE].isLoaded;
export const getCurrentCityName = (state) => state[NAME_SPACE].currentCity;
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
export const getCoords = createSelector(
    getCurrentCityOffers,
    (offers) => offers.map((offer) => [offer.location.latitude, offer.location.longitude])
);


