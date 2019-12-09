import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from './card.jsx';

configure({adapter: new Adapter()});

const mock = {
  card: {
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
  const onClickHandler = jest.fn();
  const cardComponent = shallow(<Card
    card = {card}
    onClick = {onClickHandler}
  />);

  const button = cardComponent.find(`.place-card__name`);
  button.simulate(`click`, {
    preventDefault() {},
  });

  expect(onClickHandler).toHaveBeenCalledTimes(1);
});
