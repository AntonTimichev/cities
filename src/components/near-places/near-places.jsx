import React from "react";
import PropTypes from "prop-types";

import withMap from "../../hocs/with-map/with-map.jsx";
import withOfferList from "../../hocs/with-offer-list/with-offer-list.jsx";
import Offer from "../offer/offer.jsx";

import {propertyMapClassName} from "../../apperance.js";

const MapWrapped = withMap(propertyMapClassName);
const OfferList = withOfferList(Offer);

const NearPlaces = (props) => {
  const {location, mappedCoords, nearOffers, activeItem, leaflet, ...restProps} = props;
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
        <OfferList
          {...restProps}
          activeItem={activeItem}
          offers={offers}
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
  leaflet: PropTypes.object.isRequired,
};

export default NearPlaces;
