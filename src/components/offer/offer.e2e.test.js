import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from 'react-router-dom';

import Offer from "./offer.jsx";
import {OffersMock} from "../../mocks/mock.js";

configure({adapter: new Adapter()});

const offer = OffersMock[0];

it(`Onclick on NameLink works correctly`, () => {
  const handleOfferImgClick = jest.fn();
  const cardComponent = mount(<MemoryRouter>
    <Offer
      offer={offer}
      isActive={false}
      linkName={`offer/1`}
      onOfferImgClick={handleOfferImgClick}
    />
  </MemoryRouter>);

  expect(cardComponent.find(`Link`).props().to).toBe(`offer/1`);
});
