import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Offer from "./offer.jsx";
import {OffersMock} from "../../mocks/mock.js";

const offer = OffersMock[0];

it(`Offer is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <Offer
      idError={-1}
      onFavoriteBtnClick={jest.fn()}
      offer={offer}
      isActive={false}
      onItemClick={jest.fn()}
      onBookmarkBtnClick={jest.fn()}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
