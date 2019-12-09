import React from 'react';
import renderer from 'react-test-renderer';

import CardsList from './cards-list.jsx';

const mock = {
  cardsData: [
    {
      id: `12ea45`,
      name: `Beautiful & luxurious apartment at great location`,
      src: `img/room.jpg`,
      isPremium: false,
      price: 86,
      inBookMark: false,
      roomType: `Apartment`
    },
    {
      id: `109ff3`,
      name: `Wood and stone place`,
      src: `img/room.jpg`,
      isPremium: true,
      price: 93,
      inBookMark: false,
      roomType: `Apartment`
    },
    {
      id: `34ba53`,
      name: `Nice, cozy, warm big bed apartment`,
      src: `img/room.jpg`,
      isPremium: false,
      price: 115,
      inBookMark: true,
      roomType: `Private room`
    },
  ]
};

it(`CardsList is rendered correctly`, () => {
  const {cardsData} = mock;
  const tree = renderer.create(<CardsList
    cardsData = {cardsData}
    activeItem={0}
    onItemClick={jest.fn()}
    onCardNameClick={jest.fn()}
    onCardImgClick={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
