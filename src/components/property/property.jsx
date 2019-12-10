import React from "react";
import PropTypes from "prop-types";

import ReviewsList from "../reviews-list/reviews-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import PropertyGallery from "../property-gallery/property-gallery.jsx";
import NearPlaces from "../near-places/near-places.jsx";
import ReviewsForm from "../reviews__form/reviews__form.jsx";
import withReviewUser from "../../hocs/with-user-review/with-user-review.jsx";

const NearPlacesWrapped = withActiveItem(NearPlaces);
const ReviewsFormWrapped = withReviewUser(ReviewsForm);

const Property = (props) => {
  const {
    idError,
    reviewError,
    postingReviewStatus,
    changeReviewStatus,
    offerData,
    reviews,
    isAuth,
    postReview,
    onFavoriteBtnClick,
    ...restProps} = props;

  const {
    id,
    images,
    isPremium,
    isFavorite,
    title,
    rating,
    price,
    goods,
    host,
    description,
    maxAdults,
    bedrooms,
    location} = offerData;

  let bookmarkClass = `property__bookmark-button button ${isFavorite ? `property__bookmark-button--active` : ``}`;
  if (idError === id) {
    bookmarkClass = `property__bookmark-button button property__bookmark-button--error`;
  }

  const handleBookmarkBtnClick = (e) => {
    e.preventDefault();
    onFavoriteBtnClick(`${id}/${Number(!isFavorite)}`, id, !isFavorite);
  };

  return <main className="page__main page__main--property">
    <section className="property">
      <PropertyGallery images={images} />
      <div className="property__container container">
        <div className="property__wrapper">
          <div className="property__mark">
            {isPremium && <span>Premium</span>}
          </div>
          <div className="property__name-wrapper">
            <span className="property__name property__name--city">{offerData.city.name}</span>
            <h1 className="property__name">
              {title}
            </h1>
            <button className={bookmarkClass} type="button" onClick={handleBookmarkBtnClick}>
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: `${20 * Math.round(rating)}%`}}/>
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
            {reviews.length !== 0 && <ReviewsList reviews={reviews} />}
            {isAuth &&
            <ReviewsFormWrapped
              id={id}
              postReview={postReview}
              reviewError={reviewError}
              postingReviewStatus={postingReviewStatus}
              changeReviewStatus={changeReviewStatus}
            />}
          </section>
        </div>
      </div>
    </section>
    <NearPlacesWrapped
      {...restProps}
      idError={idError}
      onFavoriteBtnClick={onFavoriteBtnClick}
      location={location}
    />
  </main>;
};

Property.propTypes = {
  offerData: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  isAuth: PropTypes.bool.isRequired,
  postReview: PropTypes.func.isRequired,
  onFavoriteBtnClick: PropTypes.func.isRequired,
  idError: PropTypes.number.isRequired,
  reviewError: PropTypes.bool.isRequired,
  postingReviewStatus: PropTypes.bool.isRequired,
  changeReviewStatus: PropTypes.func.isRequired
};

export default Property;
