import React from "react";
import {useEffect} from "react";
import PropTypes from "prop-types";

import ReviewsList from "../reviews-list/reviews-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import PropertyGallery from "../property-gallery/property-gallery.jsx";
import NearPlaces from "../near-places/near-places.jsx";

const NearPlacesWrapped = withActiveItem(NearPlaces);

const Property = ({offerData, reviews, nearOffers, mappedCoords, leaflet}) => {
  const {images, isPremium, title, rating, price, goods, host, description, maxAdults, bedrooms, location} = offerData;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return <main className="page__main page__main--property">
    <section className="property">
      <PropertyGallery images={images} />
      <div className="property__container container">
        <div className="property__wrapper">
          <div className="property__mark">
            {isPremium && <span>Premium</span>}
          </div>
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {title} ({offerData.city.name})
            </h1>
            <button className="property__bookmark-button button" type="button">
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: `96%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{rating}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              Entire place
            </li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {goods.map((item, i) => <li key={i} className="property__inside-item">{item}</li>)}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74"
                  alt="Host avatar" />
              </div>
              <span className="property__user-name">
                {host.name}
              </span>
              <span className="property__user-status">
                {host.isPro}
              </span>
            </div>
            <div className="property__description">
              <p className="property__text">
                {description}
              </p>
            </div>
          </div>
          <section className="property__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
            {reviews.length && <ReviewsList reviews={reviews} />}
            <form className="reviews__form form" action="#" method="post">
              <label className="reviews__label form__label" htmlFor="review">Your review</label>
              <div className="reviews__rating-form form__rating">
                <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>

                <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                </label>
              </div>
              <textarea className="reviews__textarea form__textarea" id="review" name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"/>
              <div className="reviews__button-wrapper">
                <p className="reviews__help">
                  To submit review please make sure to set <span className="reviews__star">rating</span> and describe
                  your stay with at least <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
    <NearPlacesWrapped
      leaflet={leaflet}
      location={location}
      nearOffers={nearOffers}
      mappedCoords={mappedCoords}
    />
  </main>;
};

Property.propTypes = {
  offerData: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  mappedCoords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired
  })),
  nearOffers: PropTypes.arrayOf(PropTypes.object).isRequired,
  leaflet: PropTypes.object.isRequired
};

export default Property;
