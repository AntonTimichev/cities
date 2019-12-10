import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import Property from "./property.jsx";
import {OffersMock, leafletMock} from "../../mocks/mock.js";

const mock = {
  nearOffers: OffersMock,
  offerData: OffersMock[0],
  leaflet: leafletMock,
  isAuth: false,
  postReview: jest.fn(),
  addToFavorites: jest.fn(),
  mappedCoords: [
    {
      id: 10,
      position: [52.3909553943508, 4.85309666406198]
    },
    {
      id: 13,
      position: [52.3909553943508, 4.929309666406198]
    },
    {
      id: 18,
      position: [52.3809553941245, 4.939309666405649]
    }
  ],
  reviews: [
    {
      id: 1,
      user: {
        id: 4,
        isPro: false,
        name: `Max`,
        avatarUrl: `img/1.png`
      },
      rating: 4,
      comment: `A the unique lightness of Amsterdam.`,
      date: `2019-05-08T14:13:56.569Z`
    },
    {
      id: 2,
      user: {
        id: 4,
        isPro: false,
        name: `John`,
        avatarUrl: `img/3.png`
      },
      rating: 3,
      comment: `A quiet cozy and picturesque that hides behind`,
      date: `2019-10-10T12:19:56.569Z`
    }
  ]
};

it(`Property is rendered correctly`, () => {
  const {offerData, reviews, nearOffers, mappedCoords, leaflet, isAuth, postReview, addToFavorites} = mock;
  const tree = renderer.create(<MemoryRouter>
    <Property
      offerData={offerData}
      reviews={reviews}
      nearOffers={nearOffers}
      mappedCoords={mappedCoords}
      leaflet={leaflet}
      isAuth={isAuth}
      postReview={postReview}
      addToFavorites={addToFavorites}
    />
  </MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
