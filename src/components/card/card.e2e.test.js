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
  const onNameClickHandler = jest.fn();
  const onCardClickHandler = jest.fn();
  const cardComponent = shallow(<Card
    card = {card}
    onCardNameClick= {onNameClickHandler}
    onCardImgClick= {onCardClickHandler}
  />);

  const buttonName = cardComponent.find(`.place-card__name`);
  buttonName.simulate(`click`, {
    preventDefault() {},
  });

  expect(onNameClickHandler).toHaveBeenCalledTimes(1);

  const buttonImg = cardComponent.find(`.place-card__image-wrapper a`);
  buttonImg.simulate(`click`, {
    preventDefault() {},
  });

  expect(onCardClickHandler).toHaveBeenCalledWith(`3e3ff4`);
});
