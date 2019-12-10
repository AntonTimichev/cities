import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Favorites from "./favorites.jsx";
import {OffersMock} from "../../mocks/mock.js";

const favorites = [
  [`Amsterdam`, [OffersMock[0]]],
  [`Paris`, [OffersMock[1]]]
];

it(`Favorites is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <Favorites
      favorites={favorites}
      onCityNameClick={jest.fn()}
      idError={-1}
      onFavoriteBtnClick={jest.fn()}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
