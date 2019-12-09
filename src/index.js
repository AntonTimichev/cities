import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from 'recompose';

import reducer from "./reducer/index.js";
import {Operation, ActionCreator} from "./reducer/data/data.js";
import App from './components/app/app.jsx';
import {createAPI} from './api.js';
import withLoader from "./hocs/with-loader/with-loader.jsx";

const AppWrapped = withLoader(App);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  store.dispatch(Operation.loadOffers());
  store.dispatch(ActionCreator.setCurrentCity(`Amsterdam`));

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      leaflet={leaflet}
    />
  </Provider>,
  document.querySelector(`#root`));
};

init();
