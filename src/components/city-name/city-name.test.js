import React from 'react';
import renderer from 'react-test-renderer';

import CityName from './city-name.jsx';

const mock = {
  cityName: `Amsterdam`,
  currentCity: `Hamburg`,
  onCityNameClick: jest.fn()
};

it(`CityName is rendered correctly`, () => {
  const {cityName, currentCity, onCityNameClick} = mock;
  const tree = renderer.create(<CityName
    cityName={cityName}
    currentCity={currentCity}
    onCityNameClick={onCityNameClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
