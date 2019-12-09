import React from 'react';
import renderer from 'react-test-renderer';

import CardMark from './card-mark.jsx';


it(`CardMark is rendered correctly`, () => {
  const tree = renderer.create(<CardMark />).toJSON();

  expect(tree).toMatchSnapshot();
});
