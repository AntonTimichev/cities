import React from "react";
import PropTypes from "prop-types";

import OfferInfo from "../offer-info/offer-info.jsx";

const Offer = ({offer, isActive, onItemClick, ...props}) => {
  const {previewImage, isPremium, id} = offer;

  const handleOfferImgClick = (e) => {
    e.preventDefault();
    onItemClick(isActive ? -1 : id);
  };

  return <article className="cities__place-card place-card" style={{opacity: `${isActive ? `0.6` : ``}`}}>
    {isPremium && <div className="place-card__mark">
      <span>Premium</span>
    </div>}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#" onClick = {handleOfferImgClick}>
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
      </a>
    </div>
    <div className="place-card__info">
      <OfferInfo
        {...props}
        offer={offer}
      />
    </div>
  </article>;
};

Offer.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool,
  onItemClick: PropTypes.func
};

export default Offer;
