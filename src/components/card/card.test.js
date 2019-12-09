import React from 'react';
import renderer from 'react-test-renderer';

import Card from './card.jsx';

const mock = {
  card: {
    id: `34ba53`,
    name: `Beautiful & luxurious apartment at great location`,
    src: `img/room.jpg`,
    isPremium: false,
    price: 86,
    inBookMark: true,
    roomType: `Apartment`
  }
};

it(`Card is rendered correctly`, () => {
  const {card} = mock;
  const tree = renderer.create(<Card
    card = {card}
    onCardNameClick= {jest.fn()}
    onCardImgClick= {jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
