import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';
import {leafletMock, OffersMock} from "../../mocks/mock";

const mock = {
  offers: OffersMock,
  leaflet: leafletMock,
  cityNames: [`Amsterdam`, `Cologne`, `Brussels`, `Paris`, `Hamburg`, `Dusseldorf`],
  currentCity: `Amsterdam`,
  onCityNameClick: jest.fn(),
  location: {
    latitude: 45.325654,
    longitude: 4.32644,
    zoom: 14
  },
  coords: [
    [52.395570, 4.875431],
    [52.417196, 4.902786],
    [52.393014, 4.903487],
    [52.374183, 4.892763],
    [52.392677, 4.847682],
    [52.357554, 4.912858],
    [52.352164, 4.862169],
    [52.394647, 4.880173],
    [52.385484, 4.938223],
    [52.401392, 4.928084],
    [52.374118, 4.878774],
    [52.360040, 4.949277],
    [52.364264, 4.914434]
  ]
};

it(`App is rendered correctly`, () => {
  const {offers, leaflet, cityNames, currentCity, onCityNameClick, location, coords} = mock;
  const tree = renderer.create(<App
    offers={offers}
    leaflet={leaflet}
    cityNames={cityNames}
    currentCity={currentCity}
    onCityNameClick={onCityNameClick}
    location={location}
    coords={coords}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
