import React from "react";
import PropTypes from "prop-types";

const PropertyGallery = (props) => {
  const {images} = props;

  return <div className="property__gallery-container container">
    <div className="property__gallery">
      {images.map((image, i) => <div key={i} className="property__image-wrapper">
        <img className="property__image" src={image} alt="Photo studio" />
      </div>)}
    </div>
  </div>;
};

PropertyGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PropertyGallery;
