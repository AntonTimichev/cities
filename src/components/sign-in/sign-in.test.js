import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from 'react-router-dom';

import SignIn from "./sign-in.jsx";

it(`SignIn is rendered correctly`, () => {
  const tree = renderer.create(<MemoryRouter>
    <SignIn
      currentCity={`Amsterdam`}
      loginErrorStatus={false}
      isInvalidMail={false}
      isInvalidPass={false}
      onFormSubmit={jest.fn()}
      onInputBlur={jest.fn()}
    /></MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
