import React from "react";
import renderer from "react-test-renderer";

import CityName from "./city-name.jsx";

it(`CityName is rendered correctly`, () => {
  const cityName = `Amsterdam`;
  const tree = renderer.create(<CityName
    cityName={cityName}
    isActive={false}
    onItemClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
