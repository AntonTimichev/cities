import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import {Property} from "./property.jsx";
import {OffersMock} from "../../mocks/mock.js";

const offer = OffersMock[0];

it(`Property is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <Property
      offerData={offer}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
