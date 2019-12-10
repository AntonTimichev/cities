import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import App from "./components/app/app.jsx";
import withSwitchPages from "./hocs/with-switch-pages/with-switch-pages.jsx";
import withActiveItem from "./hocs/with-active-item/with-active-item.jsx";
import withHeader from "./hocs/with-header/with-header.jsx";
import reducer from "./reducer/index.js";

import history from "./history.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator as UserActionCreator} from "./reducer/user/user.js";

import {createAPI} from "./api.js";
import ApiProvider from "./api-provider.js";
import LocalStore from "./local-store.js";


const AppWrapped = withSwitchPages(withHeader(withActiveItem(App)));
const CITIES_STORE_KEY = `CITIES_STORE_KEY`;

const init = () => {
  const localStore = new LocalStore(localStorage, {dataKey: CITIES_STORE_KEY});
  const api = createAPI(() => {
    store.dispatch(UserActionCreator.isLogin(false));
    store.dispatch(UserActionCreator.logoutUser());
    history.push(`/login`);
  });
  const apiProvider = new ApiProvider(api, localStore);

  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(apiProvider))
      )
  );
  store.dispatch(UserOperation.checkAuth());
  store.dispatch(DataOperation.loadOffers());

  window.addEventListener(`offline`, () => {
    document.title = `${document.title}[OFFLINE]`;
  });
  window.addEventListener(`online`, () => {
    document.title = document.title.split(`[OFFLINE]`)[0];
    store.dispatch(DataOperation.syncOffers());
  });

  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
