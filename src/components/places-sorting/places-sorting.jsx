import React from "react";
import PropTypes from "prop-types";

const PlacesSorting = ({currentKey, currentOption, options, isOpen, onSortingItemCLick, onToggleItemClick}) => {

  const handleSortingClick = (e) => {
    e.preventDefault();
    const {key} = e.target.dataset;
    if (key === currentKey) {
      return;
    }
    onSortingItemCLick(e.target.dataset.key);
    onToggleItemClick();
  };

  const handleSpanBtnClick = () => {
    onToggleItemClick();
  };

  const optionsClassName = `places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`;

  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0" onClick={handleSpanBtnClick}>
      {currentOption}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select" />
      </svg>
    </span>
    <ul className={optionsClassName} onClick={handleSortingClick}>
      {Object.entries(options).map((pair, i) => {
        const [key, option] = pair;
        return <li key={i} className="places__option" tabIndex="0" data-key={key}>{option}</li>;
      })}
    </ul>
  </form>;
};

PlacesSorting.propTypes = {
  currentKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  options: PropTypes.object.isRequired,
  currentOption: PropTypes.string.isRequired,
  onSortingItemCLick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleItemClick: PropTypes.func.isRequired,
};

export default PlacesSorting;
