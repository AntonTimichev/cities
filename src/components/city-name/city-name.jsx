import React from "react";
import PropTypes from "prop-types";

const CityName = (props) => {
  const {cityName, isActive, onCityNameClick} = props;
  const classOfCity = `locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`;

  const handleCityNameClick = (e) => {
    e.preventDefault();
    onCityNameClick(cityName);
  };

  return <li className="locations__item">
    <a className={classOfCity} href="#" onClick={handleCityNameClick}>
      <span>{cityName}</span>
    </a>
  </li>;
};

CityName.propTypes = {
  cityName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onCityNameClick: PropTypes.func.isRequired
};

export default CityName;
