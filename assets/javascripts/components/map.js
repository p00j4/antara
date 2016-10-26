"use strict";
var React      = require("react"),
    ReactDOM   = require("react-dom"),
    L          = require("leaflet"),
    topojson   = require("topojson"),
    $          = require("jquery"),
    chroma     =require("chroma-js");
    
var config = {};

// using webpack json loader we can import our topojson file like this
var topodata = require('../../../data/india_states.topo.json');
L.TopoJSON = L.GeoJSON.extend({
    addData: function(jsonData) {
                  if (jsonData.type === "Topology") {
                    for (var key in jsonData.objects) {
                        var geojson = topojson.feature(jsonData, jsonData.objects[key]);
                        L.GeoJSON.prototype.addData.call(this, geojson);
                    }
                  }    
                  else {
                    L.GeoJSON.prototype.addData.call(this, jsonData);
                  }
                }
            });
var colorScale = chroma
                .scale(['#D5E3FF', '#003171'])
                .domain([0,1]);

var $tooltip = $('#statetooltip');
// map paramaters to pass to L.map when we instantiate it
config.params = {
    center: [20.59, 78.96], //Greenpoint
    zoomControl: false,
    zoom: 4.4,
    scrollwheel: false,
    legends: true,
    infoControl: false,
    attributionControl: true
};

// params for the L.tileLayer (aka basemap)
config.tileLayer = {
    uri: "https://api.mapbox.com/styles/v1/suchismitanaik/cit4r7vpt002j2yqrk7cx5smt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3VjaGlzbWl0YW5haWsiLCJhIjoiY2lqMmZ5N2N5MDAwZnVna25hcjE2b2Q1eCJ9.IYx8Zoc0yNPcp7Snd7yW2A",
    params: {
        minZoom: 4.4,
        maxZoom: 20,
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
                topoLayer: null,
                topojson: null
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
                        
        addTopoJSONLayer: function(topojsondata) {
            
            var topoLayer = new L.TopoJSON();
            //var topojsonLayer = L.geoJson(geojson, {
            //    style: this.style,
            //    onEachFeature: this.onEachFeature
            //});
            //topojsonLayer.addTo(this.map);

            topoLayer.addData(topojsondata);
            topoLayer.addTo(map);
            this.state.topoLayer = topoLayer;
            // fit the map to the new geojson layer's geographic extent
            this.zoomToFeature(topoLayer);
        },
        
        style:function(feature) {
            return {
                fillColor: this.getColor(feature.properties.ID_1),
                weight: 0,
                opacity: 1,
                color: 'yellow',
                fillOpacity: 0.7
            };
        },
    
        getColor:function (d) {
            return d === 1 ? '#800026' :
                   d === 2 ? '#BD0026' :
                   d === 3 ? '#E31A1C' :
                   d === 4 ? '#FC4E2A' :
                   d === 5 ? '#FD8D3C' :
                   d === 6 ? '#FEB24C' :
                   d === 7 ? '#FED976' :
                   d === 8 ? '#BD0026' :
                   d === 9 ? '#E31A1C' :
                   d === 10 ? '#FC4E2A' :
                   d === 11 ? '#FD8D3C' :
                   d === 12 ? '#FEB24C' :
                   d === 13 ? '#FED976' :
                   d === 14 ? '#BD0026' :
                   d === 15 ? '#E31A1C' :
                   d === 16 ? '#FC4E2A' :
                   d === 17 ? '#FD8D3C' :
                   d === 18 ? '#FEB24C' :
                   d === 19 ? '#FED976' :
                   d === 20 ? '#BD0026' :
                   d === 21 ? '#E31A1C' :
                   d === 22 ? '#FC4E2A' :
                   d === 23 ? '#FD8D3C' :
                   d === 24 ? '#FEB24C' :
                   d === 25 ? '#FED976' :
                   d === 26 ? '#BD0026' :
                   d === 27 ? '#E31A1C' :
                   d === 28 ? '#FC4E2A' :
                   d === 29 ? '#FD8D3C' :
                   d === 30 ? '#FEB24C' :
                   d === 31 ? '#FED976' :
                   d === 32 ? '#E31A1C' :
                   d === 33 ? '#FC4E2A' :
                   d === 34 ? '#FD8D3C' :
                   d === 35 ? '#FEB24C' :
                   d === 36 ? '#FED976' :
                   '#FFEDA0';
        },
                                   
       highlightFeature: function(e) {
           var layer = e.target;
           
           layer.setStyle({
                          weight: 1,
                          color: 'yellow',
                          dashArray: '',
                          fillOpacity: 0.7
                          });
           
           if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
           layer.bringToFront();
           }
        },
       
       resetHighlight:function(e) {
           this.state.geojsonLayer.resetStyle(e.target);
       },
                                   
       onEachFeature:function(feature, layer) {
          layer.on({
                mouseover: this.highlightFeature,
                mouseout: this.resetHighlight,
                click: this.zoomToFeature
           });
       },
       
        zoomToFeature: function(target) {
               // pad fitBounds() so features aren't hidden under the Filter UI element
               var fitBoundsParams = {
               paddingTopLeft: [200,10],
               paddingBottomRight: [10,10]
               };
               // set the map's center & zoom so that it fits the geographic extent of the layer
               this.map.fitBounds(target.getBounds(), fitBoundsParams);
        },
                                   
        
        init: function(id) {
            if (this.map) {
                return;
            }
//            // this function creates the Leaflet map object and is called after the Map component mounts
//            this.map = L.map(id, config.params);
//            L.control.zoom({ position: "bottomleft"}).addTo(this.map);
//            L.control.scale({ position: "bottomleft"}).addTo(this.map);
//        
//            // a TileLayer is used as the "basemap"
//            var tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(this.map);
//           
//           // set our state to include the tile layer
//           this.state.tileLayer= tileLayer;
//                                   
           this.state.topojson = topodata;
//
//           if (this.state.topojson && this.map && !this.state.topoLayer) {
//           // add the topojson overlay
//           this.addTopoJSONLayer(this.state.topojson);
//           }

           this.map = L.map(id,{maxZoom:10,minZoom:3});
           var topoLayer = new L.TopoJSON();

           
           this.map.setView([20.59, 78.96], 4.4);
          
           
           topoLayer.addData(this.state.topojson);
           topoLayer.addTo(this.map);
           topoLayer.eachLayer(this.handleLayer);

        },
       handleLayer:function(layer){
           var randomValue = Math.random(),
               fillColor = colorScale(randomValue).hex();
           
           layer.setStyle({
                          fillColor : fillColor,
                          fillOpacity: 1,
                          color:'#555',
                          weight:1,
                          opacity:.5
                          });
           var _self = this;
           var targetlayer = layer;
           layer.on('mouseover',function(e){
                    _self.enterLayer(this)
                    });
           layer.on('mouseout',function(e){
                    _self.leaveLayer(this)
                    });
                

       },
       enterLayer:function(layer){
           var stateName = "Hello";
           $tooltip.text(stateName).show();
           
           layer.bringToFront();
           layer.setStyle({
                         weight:2,
                         opacity: 1
                         });
       },
       leaveLayer:function(layer){
           $tooltip.hide();
           
           layer.bringToBack();
           layer.setStyle({
                         weight:1,
                         opacity:.5
                         });
       
       },
        render: function () {
            return MapTemplate();
        }
    }
);

module.exports = MapLeaflet;