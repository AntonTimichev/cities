import React from "react";
import renderer from "react-test-renderer";

import ReviewsList from "./reviews-list.jsx";

const reviews = [
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
];

it(`ReviewsList is rendered correctly`, () => {
  const tree = renderer.create(<ReviewsList
    reviews={reviews}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
