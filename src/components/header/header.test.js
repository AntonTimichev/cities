import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Header from "./header.jsx";

const user = {
  avatar: ``,
  email: ``
};

it(`Header is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <Header
      user={user}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
