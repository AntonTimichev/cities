import React from 'react';
import propTypes from 'prop-types';
import CardMark from './card-mark.jsx';

const Card = ({card}) => {
  const {name, src, isPremium, price, inBookMark, roomType} = card;
  const btnClass = `place-card__bookmark-button button ${inBookMark ? `place-card__bookmark-button--active` : ``}`;

  return <article className="cities__place-card place-card">
    {isPremium ? <CardMark /> : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={src} width="260" height="200" alt="Place image" />
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
          <span className="visually-hidden">{inBookMark ? `In` : `To`} bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `93%`}} />
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{name}</a>
      </h2>
      <p className="place-card__type">{roomType}</p>
    </div>
  </article>;
};

export default Card;

Card.propTypes = {
  card: propTypes.shape({
    name: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
    isPremium: propTypes.bool.isRequired,
    price: propTypes.number.isRequired,
    inBookMark: propTypes.bool.isRequired,
    roomType: propTypes.string.isRequired,
  }).isRequired
};
