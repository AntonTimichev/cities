import React from 'react';
import ReactDOM from 'react-dom';
import {cardsData} from './components/mok-data.js';
import App from './components/app/app.jsx';


const init = () => {

  ReactDOM.render(
      <App
        cardsData = {cardsData}
      />,
      document.querySelector(`#root`)
  );
};

init();
