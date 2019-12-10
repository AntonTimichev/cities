import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const OfferInfo = ({offer, idError, onFavoriteBtnClick}) => {
  const {title, price, isFavorite, type, id, rating} = offer;
  let btnClass = `place-card__bookmark-button button ${isFavorite ? `place-card__bookmark-button--active` : ``}`;
  if (idError === id) {
    btnClass = `place-card__bookmark-button button place-card__bookmark-button--error`;
  }
  const linkName = `/offer/${id}`;

  const handleBookmarkBtnClick = (e) => {
    e.preventDefault();
    onFavoriteBtnClick(`${id}/${Number(!isFavorite)}`, id, !isFavorite);
  };

  return <React.Fragment>
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{price}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <button className={btnClass} type="button" onClick={handleBookmarkBtnClick}>
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="#icon-bookmark" />
        </svg>
        <span className="visually-hidden">{isFavorite ? `In` : `To`} bookmarks</span>
      </button>
    </div>
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{width: `${20 * Math.round(rating)}%`}} />
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
    <h2 className="place-card__name">
      <Link to={linkName}>{title}</Link>
    </h2>
    <p className="place-card__type">{type}</p>
  </React.Fragment>;
};

OfferInfo.propTypes = {
  offer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  idError: PropTypes.number.isRequired,
  onFavoriteBtnClick: PropTypes.func.isRequired
};

export default OfferInfo;
