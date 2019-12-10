import React from "react";
import renderer from "react-test-renderer";

import MainEmpty from "./main-empty.jsx";

it(`MainEmpty is rendered correctly`, () => {
  const tree = renderer.create(
      <MainEmpty
        currentCity={`Amsterdam`}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
