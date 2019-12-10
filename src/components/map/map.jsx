import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {ZOOM, CITY_LOCATION, ICON_SIZE} from "../../constants";

class Map extends Component {
  constructor(props) {
    super(props);
    this._map = React.createRef();
    this._markers = null;
    this._location = null;
    this._icon = null;
  }

  render() {
    return <section className="cities__map map" ref={this._map}/>;
  }

  componentDidMount() {
    this._initMap();
  }

  shouldComponentUpdate(nextProps) {
    const {coords, leaflet} = nextProps;
    this._removePins();
    this._addPins(coords, leaflet);
    return true;
  }

  _initMap() {
    const {coords, leaflet} = this.props;
    const city = [CITY_LOCATION.X, CITY_LOCATION.Y];
    const zoom = ZOOM;

    this._icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [ICON_SIZE.WIDTH, ICON_SIZE.HEIGHT]
    });
    this._location = leaflet.map(this._map.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    this._location.setView(city, zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._location);
    this._addPins(coords, leaflet);
  }

  _addPins(coords, leaflet) {
    const pins = coords.map((coord) => leaflet.marker(coord, {icon: this._icon}));
    this._markers = leaflet.featureGroup(pins).addTo(this._location);
  }

  _removePins() {
    if (this._markers) {
      this._markers.remove();
    }
  }
}

Map.propTypes = {
  coords: PropTypes.array.isRequired,
  leaflet: PropTypes.object.isRequired
};

export default Map;
