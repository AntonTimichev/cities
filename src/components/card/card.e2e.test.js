import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from './card.jsx';

configure({adapter: new Adapter()});

const mock = {
  card: {
    id: `3e3ff4`,
    name: `Beautiful & luxurious apartment at great location`,
    src: `img/room.jpg`,
    isPremium: false,
    price: 86,
    inBookMark: true,
    roomType: `Apartment`
  }
};

it(`Onclick on NameLink works correctly`, () => {
  const {card} = mock;
  const handleCardNameClick = jest.fn();
  const handleCardImgClick = jest.fn();
  const cardComponent = shallow(<Card
    card = {card}
    isActive={false}
    onItemClick={jest.fn()}
    onCardNameClick= {handleCardNameClick}
    onCardImgClick= {handleCardImgClick}
  />);

  const buttonName = cardComponent.find(`.place-card__name`);
  buttonName.simulate(`click`, {
    preventDefault() {},
  });

  expect(handleCardNameClick).toHaveBeenCalledTimes(1);

  const buttonImg = cardComponent.find(`.place-card__image-wrapper a`);
  buttonImg.simulate(`click`, {
    preventDefault() {},
  });

  expect(handleCardImgClick).toHaveBeenCalledTimes(1);
});
