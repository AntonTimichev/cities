import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Header from "./header.jsx";

const userParams = {
  avatar: ``,
  email: ``
};

it(`Header is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <Header
      userParams={userParams}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
