import React from "react";
import PropTypes from "prop-types";

import CityName from "../city-name/city-name.jsx";

const CitiesList = (props) => {
  const {cityNames, currentCity, onCityNameClick} = props;

  return <ul className="locations__list tabs__list">
    {cityNames.map((cityName, i) => <CityName
      key={i}
      cityName={cityName}
      isActive={cityName === currentCity}
      onCityNameClick={onCityNameClick}
    />)}
  </ul>;
};

CitiesList.propTypes = {
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityNameClick: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
};

export default CitiesList;
