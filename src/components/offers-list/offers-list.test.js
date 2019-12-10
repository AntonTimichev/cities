import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import OffersList from "./offers-list.jsx";
import {OffersMock} from "../../mocks/mock";

it(`OffersList is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <OffersList
      offers={OffersMock}
      activeItem={0}
      onItemClick={jest.fn()}
      onOfferImgClick={jest.fn()}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
