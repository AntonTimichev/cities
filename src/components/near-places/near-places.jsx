import React from "react";
import PropTypes from "prop-types";

import withMap from "../../hocs/with-map/with-map.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import {PROPERTY_MAP} from "../../hocs/with-map/class-names.js";

const MapWrapped = withMap(PROPERTY_MAP);

const NearPlaces = (props) => {
  const {location, mappedCoords, nearOffers, activeItem, onItemClick, leaflet} = props;
  const offers = nearOffers.length > 1 ? nearOffers.slice(1, nearOffers.length) : [];

  return <div className="container">
    <MapWrapped
      location={location}
      mappedCoords={mappedCoords}
      id={activeItem}
      initCoords={mappedCoords[0]}
      leaflet={leaflet}
    />
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        <OffersList
          activeItem={activeItem}
          offers={offers}
          onOfferImgClick={onItemClick}
        />
      </div>
    </section>
  </div>;
};

NearPlaces.propTypes = {
  location: PropTypes.object.isRequired,
  mappedCoords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired
  })),
  nearOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.number,
  onItemClick: PropTypes.func,
  leaflet: PropTypes.object.isRequired
};

export default NearPlaces;