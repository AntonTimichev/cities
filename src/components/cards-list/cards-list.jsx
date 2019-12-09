import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

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
  cardsData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    inBookMark: PropTypes.bool.isRequired,
    roomType: PropTypes.string.isRequired,
  })).isRequired,
  onCardNameClick: PropTypes.func.isRequired
};
