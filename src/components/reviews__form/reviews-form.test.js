import React from "react";
import renderer from "react-test-renderer";

import ReviewsForm from "./reviews__form.jsx";

it(`ReviewsForm is rendered correctly`, () => {
  const tree = renderer.create(<ReviewsForm
    onRatingClick={jest.fn()}
    onFormSubmit={jest.fn()}
    onInputBlur={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
