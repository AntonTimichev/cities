import React from 'react';
import PropTypes from "prop-types";

import CityName from '../city-name/city-name.jsx';

const CitiesList = (props) => {
  const {cityNames, activeItem, onItemClick, onCityNameClick} = props;

  const handleNameClick = (cityName, i) => {
    onItemClick(i);
    onCityNameClick(cityName);
  };
  return <ul className="locations__list tabs__list">
    {cityNames.map((city, i) => <CityName
      key={i}
      cityName={city}
      isActive={i === activeItem}
      onItemClick={() => handleNameClick(city, i)}
    />)}
  </ul>;
};

CitiesList.propTypes = {
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityNameClick: PropTypes.func.isRequired,
  activeItem: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default CitiesList;
