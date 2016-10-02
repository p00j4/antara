"use strict";
var React      = require("react"),
    ReactDOM   = require("react-dom"),
    L          = require("leaflet");

var MapTemplate = require("../templates/components/map.jsx");

var MapLeaflet = React.createClass(
    {
        componentDidMount: function () {
            var map = this.map = L.map(
                ReactDOM.findDOMNode(this), {
                    minZoom: 2,
                    maxZoom: 20,
                    center:[20.59, 78.96],
                    layers: [
                        L.tileLayer(
                            "https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFjaGV0YW5hIiwiYSI6ImNpc3g2cnlmZTA4NW0yeXBnMDZiNHUyMWMifQ.XCAmIR_6wdmkYDOBYrGk9Q"
                        )
                    ],
                    attributionControl: false
                }
            );
            
            map.on("click", this.onMapClick);
            map.fitWorld();
        },
        componentWillUnmount: function () {
            this.map.off("click", this.onMapClick);
            this.map = null;
        },
        onMapClick: function () {
            // Do some wonderful map things...
        },
        render: function () {
            return MapTemplate();
        }
    }
);

module.exports = MapLeaflet;