import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import CitiesList from "../cities-list/cities-list.jsx";

import {ActionCreator} from "../../reducer/data/data.js";
import {
  getCurrentCityName,
  getCurrentOption,
  getCityNames,
  getSortedOffers,
  getCurrentCityLocation,
  getCityOffersCoords
} from "../../reducer/data/selectors.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpenFilter: false
    };

    this._handleCityNameClick = this._handleCityNameClick.bind(this);
    this._handleToggleViewOptions = this._handleToggleViewOptions.bind(this);
  }

  render() {
    const {offers, currentCity, cityNames} = this.props;
    const {isOpenFilter} = this.state;
    const mainClassName = `page__main page__main--index ${offers.length ? `` : `page__main--index-empty`}`;

    return <main className={mainClassName}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <section className="locations container">
          <CitiesList
            currentCity={currentCity}
            cityNames={cityNames}
            onCityNameClick={this._handleCityNameClick}
          />
        </section>
      </div>
      {offers.length
        ? <Main
          {...this.props}
          offers={offers}
          isOpenFilter={isOpenFilter}
          onToggleItemClick={this._handleToggleViewOptions}
          currentCity={currentCity}
        />
        : <MainEmpty currentCity={currentCity} />
      }
    </main>;
  }

  _handleCityNameClick(cityName) {
    const {onCityNameClick, onItemClick} = this.props;
    onItemClick(-1);
    onCityNameClick(cityName);
    this.setState({isOpenFilter: false});
  }

  _handleToggleViewOptions() {
    this.setState({isOpenFilter: !this.state.isOpenFilter});
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  cityNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  onItemClick: PropTypes.func,
  onCityNameClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: getSortedOffers(state),
  currentOption: getCurrentOption(state),
  currentCity: getCurrentCityName(state),
  cityNames: getCityNames(state),
  location: getCurrentCityLocation(state),
  mappedCoords: getCityOffersCoords(state),
});

const mapDispatchToProps = (dispatch) => ({
  setKeySorting: (key) => {
    dispatch(ActionCreator.setKeySorting(key));
  }
});

export {App};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
