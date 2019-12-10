import {ActionType, reducer} from "./data.js";
import {OffersMock} from "../../mocks/mock.js";

it(`Should change the current city field to the transmitted value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    offers: OffersMock[0],
    cities: [`Amsterdam`, `Hamburg`, `Paris`]
  }, {
    type: ActionType.SET_CURRENT_CITY,
    payload: `Hamburg`,
  })).toEqual({
    currentCity: `Hamburg`,
    offers: OffersMock[0],
    cities: [`Amsterdam`, `Hamburg`, `Paris`]
  });
});

it(`Should change the offers field to the passed value`, () => {
  expect(reducer({
    currentCity: `Amsterdam`,
    offers: OffersMock[`Amsterdam`],
    cities: Object.keys(OffersMock)
  }, {
    type: ActionType.GET_OFFERS,
    payload: OffersMock[`Hamburg`],
  })).toEqual({
    currentCity: `Amsterdam`,
    offers: OffersMock[`Hamburg`],
    cities: Object.keys(OffersMock)
  });
});


