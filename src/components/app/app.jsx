import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import OffersList from "../offers-list/offers-list.jsx";
import withMap from "../../hocs/with-map/with-map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import {ActionCreator} from "../../reducer/data/data";
import {
  getCurrentCityName,
  getCityNames,
  getCurrentCityOffers,
  getCurrentCityLocation,
  getCityOffersCoords
} from "../../reducer/data/selectors.js";
import {MAIN_MAP} from "../../hocs/with-map/class-names.js";

const MapWrapped = withMap(MAIN_MAP);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleOfferNameClick = this._handleOfferNameClick.bind(this);
  }

  render() {
    const {offers, currentCity, cityNames, location, mappedCoords, activeItem, onItemClick, leaflet} = this.props;

    return <main className="page__main page__main&#45;&#45;index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <CitiesList
            currentCity={currentCity}
            cityNames={cityNames}
            onCityNameClick={this._handleOfferNameClick}
          />
        </section>
      </div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {currentCity}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
              Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options&#45;&#45;custom places__options&#45;&#45;">
                <li className="places__option places__option&#45;&#45;active" tabIndex="0">Popular</li>
                <li className="places__option" tabIndex="0">Price: low to high</li>
                <li className="places__option" tabIndex="0">Price: high to low</li>
                <li className="places__option" tabIndex="0">Top rated first</li>
              </ul>
            </form>
            <OffersList
              activeItem={activeItem}
              offers={offers}
              onOfferImgClick={onItemClick}
            />
          </section>
          <div className="cities__right-section">
            <MapWrapped
              location={location}
              mappedCoords={mappedCoords}
              id={activeItem}
              initCoords={{}}
              leaflet={leaflet}
            />
          </div>
        </div>
      </div>
    </main>;
  }

  _handleOfferNameClick(cityName) {
    const {onCityNameClick, onItemClick} = this.props;
    onItemClick(-1);
    onCityNameClick(cityName);
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  mappedCoords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.array.isRequired
  })),
  location: PropTypes.object.isRequired,
  currentCity: PropTypes.string.isRequired,
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityNameClick: PropTypes.func.isRequired,
  activeItem: PropTypes.number,
  onItemClick: PropTypes.func,
  leaflet: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: getCurrentCityOffers(state),
  currentCity: getCurrentCityName(state),
  cityNames: getCityNames(state),
  location: getCurrentCityLocation(state),
  mappedCoords: getCityOffersCoords(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick: (cityName) => {
    dispatch(ActionCreator.setCurrentCity(cityName));
  }
});

export {App};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
