import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from 'react-router-dom';

import withPrivateRoute from "./with-private-route.jsx";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WithPrivateRoute = withPrivateRoute(MockComponent);

it(`renders a redirect when the user is not authorised`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[`/privateComponent`]}>
        <WithPrivateRoute path='/privateComponent' isAuth={false} />
      </MemoryRouter>
  );
  expect(wrapper.find(`Redirect`).length).toEqual(1);
  wrapper.unmount();
});

it(`renders a component when the user is authorised`, () => {
  const wrapper = mount(
      <MemoryRouter initialEntries={[`/privateComponent`]}>
        <WithPrivateRoute path='/privateComponent' isAuth={true} />
      </MemoryRouter>
  );
  expect(wrapper.find(`Redirect`).length).toEqual(0);
  wrapper.unmount();
});
