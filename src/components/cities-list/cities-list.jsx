import React from 'react';
import PropTypes from "prop-types";

import CityName from '../city-name/city-name.jsx';

const CitiesList = (props) => {
  const {cities, currentCity, onCityNameClick} = props;

  return <ul className="locations__list tabs__list">
    {cities.map((city, i) => <CityName
      key={i}
      cityName={city}
      currentCity={currentCity}
      onCityNameClick={onCityNameClick}
    />)}
  </ul>;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityNameClick: PropTypes.func.isRequired
};

export default CitiesList;
