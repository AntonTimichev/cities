import React from "react";
import PropTypes from "prop-types";

const SignIn = (props) => {
  const {isInvalidMail, isInvalidPass, onInputBlur, onFormSubmit} = props;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target.closest(`.login__form form`);
    onFormSubmit(form);
  };

  return <main className="page__main page__main--login">
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form" action="#" method="post">
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input
              className="login__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
              onBlur={onInputBlur}
              style={{backgroundColor: `${isInvalidMail ? `#ffe8e8` : ``}`}}
            />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input
              className="login__input form__input"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              onBlur={onInputBlur}
              style={{backgroundColor: `${isInvalidPass ? `#ffe8e8` : ``}`}}
            />
          </div>
          <button
            className="login__submit form__submit button"
            type="submit"
            onClick={handleFormSubmit}
          >
            Sign in
          </button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </section>
    </div>
  </main>;
};

SignIn.propTypes = {
  isInvalidMail: PropTypes.bool,
  isInvalidPass: PropTypes.bool,
  onInputBlur: PropTypes.func,
  onFormSubmit: PropTypes.func
};

export default SignIn;
