import React from "react";
import PropTypes from "prop-types";

import Offer from "../offer/offer.jsx";

const OffersList = (props) => {
  const {offers, activeItem, onOfferImgClick} = props;

  return offers.length && <div className="cities__places-list places__list tabs__content">
    {offers.map((offer, i) => {
      const linkName = `/offer/${offer.id}`;
      return <Offer
        key={i}
        offer={offer}
        isActive={offer.id === activeItem}
        onOfferImgClick={onOfferImgClick}
        linkName={linkName}
      />;
    })}
  </div>;
};

export default OffersList;

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  onOfferImgClick: PropTypes.func.isRequired,
  activeItem: PropTypes.number
};
