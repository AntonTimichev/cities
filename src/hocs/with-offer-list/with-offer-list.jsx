import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withOfferList = (Component) => {
  class WithOfferList extends PureComponent {

    render() {
      const {offers} = this.props;
      return <React.Fragment>
        {offers.map((offer, i) => {
          const {activeItem} = this.props;
          return <Component
            {...this.props}
            key={i}
            isActive={offer.id === activeItem}
            offer={offer}
          />;
        })}
      </React.Fragment>;
    }
  }

  WithOfferList.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      isPremium: PropTypes.bool.isRequired,
      price: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      type: PropTypes.string.isRequired,
    })).isRequired,
    activeItem: PropTypes.number
  };

  return WithOfferList;
};

export default withOfferList;
