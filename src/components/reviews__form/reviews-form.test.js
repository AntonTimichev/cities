import React from "react";
import renderer from "react-test-renderer";

import ReviewsForm from "./reviews__form.jsx";

it(`ReviewsForm is rendered correctly`, () => {
  const tree = renderer.create(<ReviewsForm
    refForm={React.createRef()}
    refBtnSubmit={React.createRef()}
    reviewError={false}
    isSubmit={true}
    onRatingClick={jest.fn()}
    onFormSubmit={jest.fn()}
    onTextAreaInput={jest.fn()}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
