import React from 'react';
import renderer from 'react-test-renderer';

import OffersList from './offers-list.jsx';
import {OffersMock} from "../../mocks/mock";

it(`CardsList is rendered correctly`, () => {
  const tree = renderer.create(<OffersList
    offers={OffersMock}
    activeItem={0}
    onItemClick={jest.fn()}
    onOfferNameClick={jest.fn()}
    onOfferImgClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
