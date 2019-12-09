import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import CardsList from '../cards-list/cards-list.jsx';
import Map from '../map/map.jsx';
import CitiesList from "../cities-list/cities-list.jsx";
import {ActionCreator} from "../../reducer";
import withActiveItem from "../../hocs/with-active-item.jsx";

const CitiesListWrapped = withActiveItem(CitiesList);
const CardsListWrapped = withActiveItem(CardsList);

class App extends PureComponent {

  render() {
    const {cardsData, leaflet, currentCity, cities, onCityNameClick} = this.props;
    const coords = this._getCoords(cardsData);

    return <section>
      <div style={{display: `none`}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z" />
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" />
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z" />
          </symbol>
        </svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link&#45;&#45;active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link&#45;&#45;profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main&#45;&#45;index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="cities tabs">
          <section className="locations container">
            <CitiesListWrapped
              cities={cities}
              onCityNameClick={onCityNameClick}
            />
          </section>
        </div>
        <div className="cities__places-wrapper">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cardsData.length} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options&#45;&#45;custom places__options&#45;&#45;opened">
                  <li className="places__option places__option&#45;&#45;active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <CardsListWrapped
                cardsData={cardsData}
                onCardNameClick={this._handleCardNameClick}
                onCardImgClick={this._handleCardImgClick}
              />
            </section>
            <div className="cities__right-section">
              <Map
                coords={coords}
                leaflet={leaflet}
              />
            </div>
          </div>
        </div>

      </main>
    </section>;
  }

  _getCoords(cards) {
    return cards.map((card) => card.coords);
  }

  _handleCardNameClick() {
  }

  _handleCardImgClick() {
  }
}

App.propTypes = {
  cardsData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    inBookMark: PropTypes.bool.isRequired,
    roomType: PropTypes.string.isRequired,
  })).isRequired,
  leaflet: PropTypes.object.isRequired,
  currentCity: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityNameClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  cardsData: state.offers,
  currentCity: state.currentCity,
  cities: state.cities
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick: (cityName) => {
    dispatch(ActionCreator.changeCity(cityName));
    dispatch(ActionCreator.getOffers(cityName));
  },
});

export {App};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
