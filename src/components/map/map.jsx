import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this._map = React.createRef();
  }

  _getMap() {
    const {coords, leaflet} = this.props;
    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    const zoom = 12;
    const map = leaflet.map(this._map.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    coords.forEach((coord) => {
      leaflet
        .marker(coord, {icon})
        .addTo(map);
    });
  }

  componentDidMount() {
    this._getMap();
  }

  render() {
    return <section className="cities__map map" ref={this._map}/>;
  }
}

Map.propTypes = {
  coords: PropTypes.array.isRequired,
  leaflet: PropTypes.object.isRequired
};
