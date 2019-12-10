import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Main from "./main";
import {leafletMock, OffersMock} from "../../mocks/mock";

const mock = {
  offers: OffersMock,
  leaflet: leafletMock,
  isOpen: false,
  currentOption: `Popular`,
  onToggleItemClick: jest.fn(),
  currentCity: `Amsterdam`,
  onCityNameClick: jest.fn(),
  onItemClick: jest.fn(),
  setKeySorting: jest.fn(),
  addToFavorites: jest.fn(),
  activeItem: -1,
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

it(`Main is rendered correctly`, () => {
  const {offers, currentCity, isOpen, currentOption, onCityNameClick, location, mappedCoords, activeItem, onItemClick, leaflet, onToggleItemClick, addToFavorites, setKeySorting} = mock;
  const tree = renderer.create(<MemoryRouter>
    <Main
      offers={offers}
      currentCity={currentCity}
      location={location}
      mappedCoords={mappedCoords}
      activeItem={activeItem}
      onCityNameClick={onCityNameClick}
      onItemClick={onItemClick}
      leaflet={leaflet}
      onToggleItemClick={onToggleItemClick}
      currentOption={currentOption}
      setKeySorting={addToFavorites}
      isOpen={isOpen}
      addToFavorites={setKeySorting}
    /></MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
