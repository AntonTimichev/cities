import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list.jsx';

const mock = {
  cityNames: [`Amsterdam`, `Cologne`, `Brussels`, `Paris`, `Hamburg`, `Dusseldorf`],
  onCityNameClick: jest.fn(),
  onItemClick: jest.fn(),
  activeItem: 0
};

it(`CitiesList is rendered correctly`, () => {
  const {cityNames, activeItem, onItemClick, onCityNameClick} = mock;
  const tree = renderer.create(<CitiesList
    cityNames={cityNames}
    activeItem={activeItem}
    onItemClick={onItemClick}
    onCityNameClick={onCityNameClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
