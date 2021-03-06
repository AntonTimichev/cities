import React from "react";
import PropTypes from "prop-types";

const ReviewsForm = (props) => {
  const {
    refForm,
    refBtnSubmit,
    reviewError,
    isSubmit,
    onRatingClick,
    onFormSubmit,
    onTextAreaInput} = props;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit();
  };
  const classTextArea = `reviews__textarea form__textarea ${reviewError ? `form__textarea--error` : ``}`;

  return <form ref={refForm} className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onClick={onRatingClick} />
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onClick={onRatingClick} />
      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onClick={onRatingClick} />
      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onClick={onRatingClick} />
      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onClick={onRatingClick} />
      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </div>
    <textarea className={classTextArea} id="review" name="review" maxLength="200"
      placeholder="Tell how was your stay, what you like and what can be improved" onInput={onTextAreaInput}/>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe
        your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button ref={refBtnSubmit} className="reviews__submit form__submit button" type="submit" disabled={isSubmit}>Submit</button>
    </div>
  </form>;
};

ReviewsForm.propTypes = {
  isSubmit: PropTypes.bool.isRequired,
  onRatingClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onTextAreaInput: PropTypes.func.isRequired,
  refForm: PropTypes.object.isRequired,
  refBtnSubmit: PropTypes.object.isRequired,
  reviewError: PropTypes.bool.isRequired
};

export default ReviewsForm;
