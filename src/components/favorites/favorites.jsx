import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import FavoriteLocation from "../favorite-location/favorite-location.jsx";

const Favorites = ({favorites, ...props}) => {

  return <React.Fragment>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {favorites.map((pair, i) => <FavoriteLocation
              key={i}
              {...props}
              pair={pair}
            />)}
          </ul>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <Link to="/" className="footer__logo-link">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  </React.Fragment>;
};

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default Favorites;

