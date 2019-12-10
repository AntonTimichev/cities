import React from "react";
import renderer from "react-test-renderer";

import ReviewItem from "./review-item.jsx";

const review = {
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
};

it(`ReviewItem is rendered correctly`, () => {
  const tree = renderer.create(<ReviewItem
    review={review}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
