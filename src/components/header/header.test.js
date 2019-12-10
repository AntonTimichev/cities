import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Header from "./header.jsx";

it(`Header is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <Header
      isAuth={true}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
