import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";

import history from "./history.js";
import reducer from "./reducer/index.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation} from "./reducer/user/user.js";
import App from "./components/app/app.jsx";
import {createAPI} from "./api.js";
import withSwitchPages from "./hocs/with-switch-pages/with-switch-pages.jsx";
import withActiveItem from "./hocs/with-active-item/with-active-item.jsx";

const AppWrapped = withSwitchPages(withActiveItem(App));

const init = () => {
  const api = createAPI(() => history.push(`/login`));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  store.dispatch(DataOperation.loadOffers());
  store.dispatch(UserOperation.checkAuth());

  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped />
      </Provider>,
      document.querySelector(`#root`));
};

init();
