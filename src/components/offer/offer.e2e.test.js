import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Offer from './offer.jsx';

configure({adapter: new Adapter()});

import {OffersMock} from "../../mocks/mock.js";

const offer = OffersMock[0];

it(`Onclick on NameLink works correctly`, () => {
  const handleOfferNameClick = jest.fn();
  const handleOfferImgClick = jest.fn();
  const cardComponent = shallow(<Offer
    offer={offer}
    isActive={false}
    onItemClick={jest.fn()}
    onOfferNameClick={handleOfferNameClick}
    onOfferImgClick={handleOfferImgClick}
  />);

  const buttonName = cardComponent.find(`.place-card__name`);
  buttonName.simulate(`click`, {
    preventDefault() {},
  });

  expect(handleOfferNameClick).toHaveBeenCalledTimes(1);

  const buttonImg = cardComponent.find(`.place-card__image-wrapper a`);
  buttonImg.simulate(`click`, {
    preventDefault() {},
  });

  expect(handleOfferImgClick).toHaveBeenCalledTimes(1);
});
