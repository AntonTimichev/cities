import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import withOfferList from "../../hocs/with-offer-list/with-offer-list.jsx";
import FavoriteOffer from "../favorite-offer/favorite-offer.jsx";

const FavoriteList = withOfferList(FavoriteOffer);

const FavoriteLocation = ({pair, onCityNameClick, ...props}) => {
  const [cityName, offers] = pair;

  const handleCityNameClick = () => {
    onCityNameClick(cityName);
  };

  return <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link to="/" className="locations__item-link" onClick={handleCityNameClick}>
          <span>{cityName}</span>
        </Link>
      </div>
    </div>
    <div className="favorites__places">
      <FavoriteList
        {...props}
        offers={offers}
      />
    </div>
  </li>;
};

FavoriteLocation.propTypes = {
  pair: PropTypes.array.isRequired,
  onCityNameClick: PropTypes.func.isRequired
};

export default FavoriteLocation;

