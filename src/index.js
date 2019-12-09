import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';


const init = () => {
  const elem = document.querySelector(`#root`);

  ReactDOM.render(
      <App />,
      elem
  );
};

init();
