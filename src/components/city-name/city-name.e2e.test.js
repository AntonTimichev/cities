import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import CityName from "./city-name.jsx";

configure({adapter: new Adapter()});

it(`Onclick on NameLink works correctly`, () => {
  const handleCityNameClick = jest.fn();
  const cityName = `Amsterdam`;
  const cityNameComponent = shallow(<CityName
    cityName={cityName}
    isActive={false}
    onItemClick={handleCityNameClick}
  />);

  const buttonName = cityNameComponent.find(`.locations__item a`);
  buttonName.simulate(`click`, {
    preventDefault() {},
  });

  expect(handleCityNameClick).toHaveBeenCalledTimes(1);
});
