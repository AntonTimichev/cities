import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from 'react-router-dom';

import OfferInfo from "./offer-info.jsx";
import {OffersMock} from "../../mocks/mock.js";

configure({adapter: new Adapter()});

const offer = OffersMock[0];

it(`Link has the correct path`, () => {
  const cardComponent = mount(<MemoryRouter>
    <OfferInfo
      offer={offer}
      idError={-1}
      onFavoriteBtnClick={jest.fn()}
    />
  </MemoryRouter>);
  expect(cardComponent.find(`Link`).props().to).toBe(`/offer/1`);

  cardComponent.unmount();
});

