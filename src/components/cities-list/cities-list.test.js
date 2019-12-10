import React from "react";
import renderer from "react-test-renderer";

import CitiesList from "./cities-list.jsx";

const mock = {
  cityNames: [`Amsterdam`, `Cologne`, `Brussels`, `Paris`, `Hamburg`, `Dusseldorf`],
  currentCity: `Amsterdam`,
  onCityNameClick: jest.fn(),
};

it(`CitiesList is rendered correctly`, () => {
  const {cityNames, currentCity, onCityNameClick} = mock;
  const tree = renderer.create(<CitiesList
    cityNames={cityNames}
    currentCity={currentCity}
    onCityNameClick={onCityNameClick}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
