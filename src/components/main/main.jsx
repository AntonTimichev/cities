import React from "react";
import PropTypes from "prop-types";

import PlacesSorting from "../places-sorting/places-sorting.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import withMap from "../../hocs/with-map/with-map.jsx";
import {citiesMap, optionsOfSorting} from "../../Apperance.js";

const MapWrapped = withMap(citiesMap);

const Main = (props) => {
  const {offers, currentCity, currentOption, isOpen, activeItem, onItemClick, mappedCoords, location, leaflet, setKeySorting, onToggleItemClick} = props;

  return <div className="cities__places-wrapper">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <PlacesSorting
          options={optionsOfSorting}
          currentOption={currentOption}
          isOpen={isOpen}
          onSortingItemCLick={setKeySorting}
          onToggleItemClick={onToggleItemClick}
        />
        <OffersList
          activeItem={activeItem}
          offers={offers}
          onOfferImgClick={onItemClick}
        />
      </section>
      <div className="cities__right-section">
        <MapWrapped
          location={location}
          mappedCoords={mappedCoords}
          id={activeItem}
          initCoords={{}}
          leaflet={leaflet}
        />
      </div>
    </div>
  </div>;
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  mappedCoords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired
  })),
  location: PropTypes.object.isRequired,
  currentCity: PropTypes.string.isRequired,
  activeItem: PropTypes.number,
  onItemClick: PropTypes.func,
  leaflet: PropTypes.object.isRequired,
  currentOption: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setKeySorting: PropTypes.func.isRequired,
  onToggleItemClick: PropTypes.func.isRequired
};

export default Main;
