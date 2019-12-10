import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({errorMessage, reLoadData}) => {
  const status = `${errorMessage ? errorMessage : `No places to stay available`}`;

  return <div className="cities__places-wrapper">
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">{status}</b>
        </div>
        {errorMessage && <button type="button" className="btn-retry" onClick={reLoadData}>To retry</button>}
      </section>
      <div className="cities__right-section">
      </div>
    </div>
  </div>;
};

ErrorComponent.propTypes = {
  errorMessage: PropTypes.string,
  reLoadData: PropTypes.func
};

export default ErrorComponent;

