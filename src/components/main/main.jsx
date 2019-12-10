import React from "react";
import PropTypes from "prop-types";

import PlacesSorting from "../places-sorting/places-sorting.jsx";
import withMap from "../../hocs/with-map/with-map.jsx";
import withOfferList from "../../hocs/with-offer-list/with-offer-list.jsx";
import Offer from "../offer/offer.jsx";

import {citiesMapClassName, optionsOfSorting} from "../../apperance.js";

const MapWrapped = withMap(citiesMapClassName);
const OfferList = withOfferList(Offer);

const Main = (props) => {
  const {
    offers,
    currentCity,
    currentOption,
    isOpenFilter,
    activeItem,
    mappedCoords,
    location,
    leaflet,
    setKeySorting,
    onToggleItemClick,
    ...restProps} = props;

  return <div className="cities__places-wrapper">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity}</b>
        <PlacesSorting
          options={optionsOfSorting}
          currentOption={currentOption}
          isOpenFilter={isOpenFilter}
          onSortingItemCLick={setKeySorting}
          onToggleItemClick={onToggleItemClick}
        />
        <div className="cities__places-list places__list tabs__content">
          <OfferList
            {...restProps}
            activeItem={activeItem}
            offers={offers}
          />
        </div>
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
  leaflet: PropTypes.object.isRequired,
  currentOption: PropTypes.string.isRequired,
  isOpenFilter: PropTypes.bool.isRequired,
  setKeySorting: PropTypes.func.isRequired,
  onToggleItemClick: PropTypes.func.isRequired,
};

export default Main;
