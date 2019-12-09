import React from 'react';
import PropTypes from 'prop-types';

import Offer from '../offer/offer.jsx';

const OffersList = (props) => {
  const {offers, activeItem, onOfferNameClick, onOfferImgClick, onItemClick} = props;

  return <div className="cities__places-list places__list tabs__content">
    {offers.map((offer, i) =>
      <Offer
        key={i}
        offer={offer}
        isActive={i === activeItem}
        onOfferNameClick={onOfferNameClick}
        onOfferImgClick={onOfferImgClick}
        onItemClick={() => onItemClick(i)}
      />)}
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
  activeItem: PropTypes.number.isRequired,
  onOfferNameClick: PropTypes.func.isRequired,
  onOfferImgClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired
};
