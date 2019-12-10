import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app.jsx';
import {leafletMock} from "../../mocks/mock";

const mock = {
  cardsData: [
    {
      id: `12ea45`,
      name: `Beautiful & luxurious apartment at great location`,
      src: `img/room.jpg`,
      isPremium: false,
      price: 86,
      inBookMark: false,
      roomType: `Apartment`
    },
    {
      id: `109ff3`,
      name: `Wood and stone place`,
      src: `img/room.jpg`,
      isPremium: true,
      price: 93,
      inBookMark: false,
      roomType: `Apartment`
    },
    {
      id: `34ba53`,
      name: `Nice, cozy, warm big bed apartment`,
      src: `img/room.jpg`,
      isPremium: false,
      price: 115,
      inBookMark: true,
      roomType: `Private room`
    },
  ],
  leaflet: leafletMock,
  cities: [`Amsterdam`, `Cologne`, `Brussels`, `Paris`, `Hamburg`, `Dusseldorf`],
  currentCity: `Amsterdam`,
  onCityNameClick: jest.fn()
};


it(`App is rendered correctly`, () => {
  const {cardsData, leaflet, cities, currentCity, onCityNameClick} = mock;
  const tree = renderer.create(<App
    cardsData = {cardsData}
    leaflet={leaflet}
    cities={cities}
    currentCity={currentCity}
    onCityNameClick={onCityNameClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
