import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import OffersList from "../offers-list/offers-list.jsx";
import withMap from "../../hocs/with-map/with-map.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import PlacesSorting from "../places-sorting/places-sorting.jsx";
import {ActionCreator} from "../../reducer/data/data";
import {
  getCurrentCityName,
  getCityNames,
  getCurrentCityOffers,
  getCurrentCityLocation,
  getCityOffersCoords
} from "../../reducer/data/selectors.js";
import {MAIN_MAP} from "../../hocs/with-map/class-names.js";
import {SortingOptions} from "../name-spaces/name-spaces.js";

const MapWrapped = withMap(MAIN_MAP);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keySorting: -1,
      isOpen: false
    };

    this._handleOfferNameClick = this._handleOfferNameClick.bind(this);
    this._handleSortingItemClick = this._handleSortingItemClick.bind(this);
    this._handleToggleViewOptions = this._handleToggleViewOptions.bind(this);
  }

  render() {
    const {offers, currentCity, cityNames, location, mappedCoords, activeItem, onItemClick, leaflet} = this.props;
    const {renderedOffers, currentOption} = this._getSortedOffers([...offers]);
    const {keySorting, isOpen} = this.state;

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
            <PlacesSorting
              options={SortingOptions}
              currentOption={currentOption}
              currentKey={keySorting}
              isOpen={isOpen}
              onSortingItemCLick={this._handleSortingItemClick}
              onToggleItemClick={this._handleToggleViewOptions}
            />
            <OffersList
              activeItem={activeItem}
              offers={renderedOffers}
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
    this.setState({isOpen: false});
  }

  _handleSortingItemClick(key) {
    this.setState({keySorting: key});
  }

  _handleToggleViewOptions() {
    this.setState({isOpen: !this.state.isOpen});
  }

  _getSortedOffers(offers) {
    const {keySorting} = this.state;
    const data = {
      currentOption: SortingOptions[keySorting] || SortingOptions[`0`]
    };
    switch (keySorting) {
      case `1`: data.renderedOffers = offers.sort((a, b) => a.price - b.price);
        break;
      case `2`: data.renderedOffers = offers.sort((a, b) => b.price - a.price);
        break;
      case `3`: data.renderedOffers = offers.sort((a, b) => b.rating - a.rating);
        break;
      default: data.renderedOffers = offers;
        break;
    }
    return data;
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
