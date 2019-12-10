import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import NearPlaces from "./near-places.jsx";

import {OffersMock, leafletMock} from "../../mocks/mock.js";

const mock = {
  nearOffers: OffersMock,
  leaflet: leafletMock,
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
  ],
  location: {
    latitude: 45.325654,
    longitude: 4.32644,
    zoom: 14
  },
  activeItem: -1,
  onItemClick: jest.fn()
};

it(`NearPlaces is rendered correctly`, () => {
  const {activeItem, mappedCoords, location, nearOffers, onItemClick, leaflet} = mock;
  const tree = renderer.create(<MemoryRouter>
    <NearPlaces
      mappedCoords={mappedCoords}
      location={location}
      activeItem={activeItem}
      onItemClick={onItemClick}
      nearOffers={nearOffers}
      leaflet={leaflet}
    /></MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
