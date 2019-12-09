import React, {PureComponent} from 'react';
import propTypes from 'prop-types';

import Card from '../card/card.jsx';

class CardsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };
    this._handleCardImgClick = this._handleCardImgClick.bind(this);
  }

  render() {
    const {cardsData, onCardNameClick} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {cardsData.map((card, i) =>
        <Card
          key = {i}
          card = {card}
          onCardNameClick = {onCardNameClick}
          onCardImgClick= {this._handleCardImgClick}
        />)}
    </div>;
  }

  _handleCardImgClick(id) {
    this.setState({activeCard: id});
  }
}

export default CardsList;

CardsList.propTypes = {
  cardsData: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    src: propTypes.string.isRequired,
    isPremium: propTypes.bool.isRequired,
    price: propTypes.number.isRequired,
    inBookMark: propTypes.bool.isRequired,
    roomType: propTypes.string.isRequired,
  })).isRequired,
  onCardNameClick: propTypes.func.isRequired
};
