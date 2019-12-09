import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {createStore} from "redux";
import {Provider} from "react-redux";

import {offers} from './mocks/offers.js';
import {reducer} from "./reducer";
import App from './components/app/app.jsx';


const init = () => {
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <App
      cardsData={offers}
      leaflet={leaflet}
    />
  </Provider>,
  document.querySelector(`#root`));
};

init();
