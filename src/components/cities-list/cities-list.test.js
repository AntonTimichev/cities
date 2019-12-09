import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list.jsx';

const mock = {
  cities: [`Amsterdam`, `Cologne`, `Brussels`, `Paris`, `Hamburg`, `Dusseldorf`],
  currentCity: `Hamburg`,
  onCityNameClick: jest.fn()
};

it(`CitiesList is rendered correctly`, () => {
  const {cities, currentCity, onCityNameClick} = mock;
  const tree = renderer.create(<CitiesList
    cities={cities}
    currentCity={currentCity}
    onCityNameClick={onCityNameClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
