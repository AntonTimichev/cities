import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Favorites from "./favorites.jsx";

it(`Favorites is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter><Favorites /></MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
