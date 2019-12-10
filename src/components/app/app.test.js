import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import {App} from "./app.jsx";
import {leafletMock, OffersMock} from "../../mocks/mock";

const mock = {
  offers: OffersMock,
  leaflet: leafletMock,
  cityNames: [`Amsterdam`, `Cologne`, `Brussels`, `Paris`, `Hamburg`, `Dusseldorf`],
  currentCity: `Amsterdam`,
  onCityNameClick: jest.fn(),
  onItemClick: jest.fn(),
  addToFavorites: jest.fn(),
  onFavoriteBtnClick: jest.fn(),
  setKeySorting: jest.fn(),
  activeItem: -1,
  idError: -1,
  location: {
    latitude: 45.325654,
    longitude: 4.32644,
    zoom: 14
  },
  isAuth: true,
  mappedCoords: [
    {
      id: 10,
      position: [52.3909553943508, 4.85309666406198]
    },
    {
      id: 13,
      position: [52.3909553943508, 4.929309666406198]
    },
    {
      id: 18,
      position: [52.3809553941245, 4.939309666405649]
    }
  ]
};

it(`App is rendered correctly`, () => {
  const {
    offers,
    cityNames,
    currentCity,
    onCityNameClick,
    location,
    mappedCoords,
    idError,
    activeItem,
    onItemClick,
    leaflet,
    onFavoriteBtnClick,
    addToFavorites,
    setKeySorting} = mock;

  const tree = renderer.create(<MemoryRouter>
    <App
      offers={offers}
      currentCity={currentCity}
      cityNames={cityNames}
      location={location}
      mappedCoords={mappedCoords}
      activeItem={activeItem}
      onCityNameClick={onCityNameClick}
      onItemClick={onItemClick}
      currentOption={`dd`}
      setKeySorting={setKeySorting}
      leaflet={leaflet}
      idError={idError}
      onFavoriteBtnClick={onFavoriteBtnClick}
      addToFavorites={addToFavorites}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
