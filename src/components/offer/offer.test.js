import React from 'react';
import renderer from 'react-test-renderer';

import Offer from './offer.jsx';
import {OffersMock} from "../../mocks/mock.js";

const offer = OffersMock[0];

it(`Card is rendered correctly`, () => {
  const tree = renderer.create(<Offer
    offer={offer}
    isActive={false}
    onItemClick={jest.fn()}
    onOfferNameClick={jest.fn()}
    onOfferImgClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
