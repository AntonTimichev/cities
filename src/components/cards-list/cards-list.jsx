import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card.jsx';

const CardsList = (props) => {
  const {cardsData, activeItem, onCardNameClick, onCardImgClick, onItemClick} = props;

  return <div className="cities__places-list places__list tabs__content">
    {cardsData.map((card, i) =>
      <Card
        key={i}
        card={card}
        isActive={i === activeItem}
        onCardNameClick={onCardNameClick}
        onCardImgClick={onCardImgClick}
        onItemClick={() => onItemClick(i)}
      />)}
  </div>;
};

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
  activeItem: PropTypes.number.isRequired,
  onCardNameClick: PropTypes.func.isRequired,
  onCardImgClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired
};
