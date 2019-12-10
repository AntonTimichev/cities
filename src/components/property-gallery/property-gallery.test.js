import React from "react";
import renderer from "react-test-renderer";

import PropertyGallery from "./property-gallery.jsx";

const images = [
  `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
  `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
  `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
  `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`
];

it(`PropertyGallery is rendered correctly`, () => {
  const tree = renderer.create(<PropertyGallery
    images={images}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
