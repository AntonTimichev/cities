import React from 'react';
import ReactDOM from 'react-dom';
import leaflet from 'leaflet';
import {offers} from './mocks/offers.js';
import App from './components/app/app.jsx';


const init = () => {

  ReactDOM.render(
      <App
        cardsData={offers}
        leaflet={leaflet}
      />,
      document.querySelector(`#root`)
  );
};

init();
