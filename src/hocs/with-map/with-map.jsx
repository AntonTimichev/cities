import React, {Component} from "react";
import PropTypes from "prop-types";

import {ICON_SIZE} from "../../apperance";

const withMap = (className) => {
  class WithMap extends Component {
    constructor(props) {
      super(props);
      this._map = React.createRef();
      this._location = null;
      this._icon = null;
      this._iconActive = null;
      this._activePin = null;
      this._initCoords = {};
      this._markers = {};
    }

    render() {
      return <section className={className} ref={this._map}/>;
    }

    componentDidMount() {
      this._initMap();
      if (this._location) {
        setTimeout(() => {
          this._location.invalidateSize();
        }, 200);
      }
    }

    shouldComponentUpdate(nextProps) {
      const {mappedCoords, location, id, initCoords, leaflet} = nextProps;
      this._processMapView({mappedCoords, location, id, initCoords, leaflet});
      return false;
    }

    _initMap() {
      this._processMapView(this.props);
    }

    _processMapView({mappedCoords, location, id, initCoords, leaflet}) {
      this._leaflet = leaflet;
      this._initCoords = initCoords;
      this._setMapParams(location);
      this._addPins(mappedCoords);
      this._createActivePin(id);
    }

    _setMapParams(location) {
      this._city = [location.latitude, location.longitude];
      this._zoom = location.zoom;
      if (!this._location) {
        this._createMap();
      }
    }

    _createMap() {
      this._location = this._leaflet.map(this._map.current, {
        center: this._city,
        zoom: this._zoom,
        zoomControl: false,
        marker: true
      });
      this._location.setView(this._city, this._zoom);
      this._setTileLayer();
      this._createIcons();
    }

    _setTileLayer() {
      this._leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors&copy;<a href="https://carto.com/attributions">CARTO</a>`
      }).addTo(this._location);
    }

    _createIcons() {
      this._icon = this._leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [ICON_SIZE.WIDTH, ICON_SIZE.HEIGHT]
      });
      this._iconActive = this._leaflet.icon({
        iconUrl: `img/pin-active.svg`,
        iconSize: [ICON_SIZE.WIDTH, ICON_SIZE.HEIGHT]
      });
    }

    _addPins(mappedCoords) {
      const layerGroup = this._leaflet.layerGroup();
      mappedCoords.forEach((obj) => {
        const {id, position} = obj;
        const marker = this._leaflet.marker(position, {icon: this._icon});
        marker.leafletId = id;
        this._markers[id] = marker;
        layerGroup.addLayer(marker);
      });
      layerGroup.addTo(this._location);
    }

    _createActivePin(id) {
      this._removeActivePin();
      if (id === -1) {
        if (this._initCoords.position) {
          const {position} = this._initCoords;
          this._setActivePin(position);
        }
        this._location.setView(this._city, this._zoom);
        return;
      }
      const marker = this._markers[id];
      if (marker) {
        const position = marker.getLatLng();
        this._setActivePin(position);
      }
    }

    _setActivePin(position) {
      this._activePin = this._leaflet.marker(position, {icon: this._iconActive});
      this._activePin.addTo(this._location);
      this._location.setView(position, this._zoom);
    }

    _removeActivePin() {
      if (this._activePin) {
        this._location.removeLayer(this._activePin);
      }
    }
  }

  WithMap.propTypes = {
    mappedCoords: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.array.isRequired
    })),
    location: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    initCoords: PropTypes.object,
    leaflet: PropTypes.object.isRequired
  };

  return WithMap;
};

export default withMap;
