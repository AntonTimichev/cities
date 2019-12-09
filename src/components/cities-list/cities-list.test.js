import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list.jsx';

const mock = {
  cities: [`Amsterdam`, `Cologne`, `Brussels`, `Paris`, `Hamburg`, `Dusseldorf`],
  onCityNameClick: jest.fn()
};

it(`CitiesList is rendered correctly`, () => {
  const {cities, onCityNameClick} = mock;
  const tree = renderer.create(<CitiesList
    cities={cities}
    activeItem={0}
    onItemClick={jest.fn()}
    onCityNameClick={onCityNameClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
