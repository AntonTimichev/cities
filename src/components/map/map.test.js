import React from 'react';
import renderer from 'react-test-renderer';

import {leafletMock} from '../../mocks/mock.js';
import Map from './map.jsx';

const mock = {
  leaflet: leafletMock,
  coords: [
    [52.3909553943508, 4.85309666406198],
    [52.369553943508, 4.85309666406198],
    [52.3909553943508, 4.929309666406198],
    [52.3809553943508, 4.939309666406198],
    [52.3809553941245, 4.939309666405649]
  ],
  location: {
    latitude: 45.325654,
    longitude: 4.32644,
    zoom: 14
  },
};

it(`Map is rendered correctly`, () => {
  const {leaflet, coords, location} = mock;
  const tree = renderer.create(<Map
    coords={coords}
    leaflet={leaflet}
    location={location}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
