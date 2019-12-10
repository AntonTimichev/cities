import React from "react";
import renderer from "react-test-renderer";

import PlacesSorting from "./places-sorting.jsx";

const options = {
  '0': `Popular`,
  '1': `Price: low to high`,
  '2': `Price: high to low`,
  '3': `Top rated first`
};

it(`PlacesSorting is rendered correctly`, () => {
  const tree = renderer.create(<PlacesSorting
    currentKey={-1}
    currentOption={`to Top`}
    options={options}
    isOpen={false}
    onToggleItemClick={jest.fn()}
    onSortingItemCLick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
