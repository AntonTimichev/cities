import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PlacesSorting from "./places-sorting.jsx";

configure({adapter: new Adapter()});

const options = {
  '0': `Popular`,
  '1': `Price: low to high`,
  '2': `Price: high to low`,
  '3': `Top rated first`
};
const handleSortingClick = jest.fn();
const handleToggleViewOptions = jest.fn();

it(`Onclick on spanBtn works correctly`, () => {
  const PlacesSortingWrapped = shallow(<PlacesSorting
    currentKey={-1}
    currentOption={`to Top`}
    options={options}
    isOpenFilter={false}
    onToggleItemClick={handleToggleViewOptions}
    onSortingItemCLick={handleSortingClick}
  />);
  expect(PlacesSortingWrapped.find(`.places__options`).hasClass(`places__options--opened`)).toEqual(false);

  const spanBtn = PlacesSortingWrapped.find(`.places__sorting-type`);
  spanBtn.simulate(`click`, {
    preventDefault() {},
  });

  expect(handleToggleViewOptions).toHaveBeenCalledTimes(1);
});

it(`Onclick on optionsList works correctly`, () => {
  const PlacesSortingWrapped = shallow(<PlacesSorting
    currentKey={-1}
    currentOption={`to Top`}
    options={options}
    isOpenFilter={false}
    onToggleItemClick={handleToggleViewOptions}
    onSortingItemCLick={handleSortingClick}
  />);

  const optionsList = PlacesSortingWrapped.find(`.places__options`);
  optionsList.simulate(`click`, {
    preventDefault() {},
    target: {
      dataset: {
        key: `1`
      }}
  });

  expect(handleSortingClick).toHaveBeenCalledTimes(1);
  expect(PlacesSortingWrapped.find(`.places__options`).hasClass(`places__options--opened`)).toEqual(false);
});

it(`optionsList render correctly`, () => {
  const PlacesSortingWrapped = shallow(<PlacesSorting
    currentKey={-1}
    currentOption={`to Top`}
    options={options}
    isOpenFilter={true}
    onToggleItemClick={handleToggleViewOptions}
    onSortingItemCLick={handleSortingClick}
  />);

  expect(PlacesSortingWrapped.find(`.places__options`).hasClass(`places__options--opened`)).toEqual(true);
});
