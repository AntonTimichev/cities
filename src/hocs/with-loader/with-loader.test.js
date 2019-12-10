import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withLoader from "./with-loader.jsx";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withLoader(MockComponent);

it(`should return null when isLoaded false`, () => {
  const wrapper = shallow(
      <MockComponentWrapped isLoaded={false} />
  );
  expect(wrapper.html()).toBeNull();
});

it(`should render the component only when isLoaded true`, () => {
  const wrapper = shallow(
      <MockComponentWrapped isLoaded={true} />
  );
  expect(wrapper.html()).not.toBe(null);
});
