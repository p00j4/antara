"use strict";
var React      = require("react"),
    ReactDOM   = require("react-dom"),
    L          = require("leaflet");
var config = {};

// using webpack json loader we can import our geojson file like this
var geojson = require('../../../data/india_states.json');

// map paramaters to pass to L.map when we instantiate it
config.params = {
    center: [20.59, 78.96], //Greenpoint
    zoomControl: false,
    zoom: 4,
    scrollwheel: false,
    legends: true,
    infoControl: false,
    attributionControl: true
};

// params for the L.tileLayer (aka basemap)
config.tileLayer = {
    uri: "https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmFjaGV0YW5hIiwiYSI6ImNpc3g2cnlmZTA4NW0yeXBnMDZiNHUyMWMifQ.XCAmIR_6wdmkYDOBYrGk9Q",
    params: {
        minZoom: 4,
        maxZoom: 4,
        attribution: "",
        id: "",
        accessToken: ""
    }
};


var MapTemplate = require("../templates/components/map.jsx");

var MapLeaflet = React.createClass(
    {
        getInitialState: function() {
            return {
                tileLayer : null,
                geojsonLayer: null,
                geojson: null
            };
        },
    
        // a variable to store our instance of L.map
        map: null,
    
        componentWillMount: function() {
            // code to run just before adding the map
        },
    
        componentDidMount: function() {
            // create the Leaflet map object
            if (!this.map) {
                this.init(this.getID());
            }
        },
    
        componentDidUpdate:function(prevProps, prevState) {


        },
        
        componentWillUnmount: function() {
            this.map.remove();
        },
        
        getID: function() {
            // get the "id" attribute of our component's DOM node
            return ReactDOM.findDOMNode(this);
        },
                        
    
        addGeoJSONLayer: function(geojson) {
            var geojsonLayer = L.geoJson(geojson, {
                style: this.style
            });
            geojsonLayer.addTo(this.map);
            this.setState({ geojsonLayer: geojsonLayer });
        },
        
        style:function(feature) {
            return {
                fillColor: this.getColor(feature.properties.ID_1),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        },
    
        getColor:function (d) {
            return d == 1 ? '#800026' :
                   d == 2 ? '#BD0026' :
                   d == 3 ? '#E31A1C' :
                   d == 4 ? '#FC4E2A' :
                   d == 5 ? '#FD8D3C' :
                   d == 6 ? '#FEB24C' :
                   d == 7 ? '#FED976' :
                                   d == 8 ? '#BD0026' :
                                   d == 9 ? '#E31A1C' :
                                   d == 10 ? '#FC4E2A' :
                                   d == 11 ? '#FD8D3C' :
                                   d == 12 ? '#FEB24C' :
                                   d == 13 ? '#FED976' :
                                   d == 14 ? '#BD0026' :
                                   d == 15 ? '#E31A1C' :
                                   d == 16 ? '#FC4E2A' :
                                   d == 17 ? '#FD8D3C' :
                                   d == 18 ? '#FEB24C' :
                                   d == 19 ? '#FED976' :
                                   d == 20 ? '#BD0026' :
                                   d == 21 ? '#E31A1C' :
                                   d == 22 ? '#FC4E2A' :
                                   d == 23 ? '#FD8D3C' :
                                   d == 24 ? '#FEB24C' :
                                   d == 25 ? '#FED976' :
                                   d == 26 ? '#BD0026' :
                                   d == 27 ? '#E31A1C' :
                                   d == 28 ? '#FC4E2A' :
                                   d == 29 ? '#FD8D3C' :
                                   d == 30 ? '#FEB24C' :
                                   d == 31 ? '#FED976' :
                                   d == 32 ? '#E31A1C' :
                                   d == 33 ? '#FC4E2A' :
                                   d == 34 ? '#FD8D3C' :
                                   d == 35 ? '#FEB24C' :
                                   d == 36 ? '#FED976' :
                                   '#FFEDA0';
        },
        
        init: function(id) {
            if (this.map) {
                return;
            }
            // this function creates the Leaflet map object and is called after the Map component mounts
            this.map = L.map(id, config.params);
            L.control.zoom({ position: "bottomleft"}).addTo(this.map);
            L.control.scale({ position: "bottomleft"}).addTo(this.map);
        
            // a TileLayer is used as the "basemap"
            var tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(this.map);
        
            // set our state to include the tile layer
            this.state.tileLayer= tileLayer;
            this.state.geojson=geojson;
            
                                   
           if (this.state.geojson && this.map && !this.state.geojsonLayer) {
               // add the geojson overlay
               this.addGeoJSONLayer(this.state.geojson);
          }
        },
        render: function () {
            return MapTemplate();
        }
    }
);

module.exports = MapLeaflet;