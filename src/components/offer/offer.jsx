import React from 'react';
import PropTypes from 'prop-types';

const Offer = ({offer, isActive, onOfferNameClick, onOfferImgClick, onItemClick}) => {
  const {title, previewImage, isPremium, price, isFavorite, type} = offer;
  const btnClass = `place-card__bookmark-button button ${isFavorite ? `place-card__bookmark-button--active` : ``}`;

  const handleOfferImgClick = (e) => {
    e.preventDefault();
    onOfferImgClick();
    onItemClick();
  };

  const handleOfferNameClick = (e) => {
    e.preventDefault();
    onOfferNameClick();
    onItemClick();
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
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={btnClass} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">{isFavorite ? `In` : `To`} bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `93%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 onClick = {onOfferNameClick} className="place-card__name">
        <a href="#" onClick={handleOfferNameClick}>{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
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
  isActive: PropTypes.bool.isRequired,
  onOfferNameClick: PropTypes.func.isRequired,
  onOfferImgClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default Offer;
