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

var MapTemplate = require("../templates/components/map.jsx");

var MapLeaflet = React.createClass(
    {
        getInitialState: function() {
            return {
                topoLayer: null,
                topojson: null,
               statetooltip:{"name":""}
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
          init: function(id) {
            if (this.map) {
                return;
            }
           this.state.topojson = topodata;

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
           this.setState({
                         statetooltip:{"name":layer.feature.properties.NAME_1}
                         });
           
           layer.bringToFront();
           layer.setStyle({
                         weight:2,
                         opacity: 1
                         });
       },
       leaveLayer:function(layer){
           this.setState({
                         statetooltip:{"name":""}
                         });
           layer.bringToBack();
           layer.setStyle({
                         weight:1,
                         opacity:.5
                         });
       
       },
        render: function () {
            return MapTemplate(this);
        }
    }
);

module.exports = MapLeaflet;