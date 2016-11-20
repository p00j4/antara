"use strict";
var React      = require("react"),
    ReactDOM   = require("react-dom"),
    L          = require("leaflet"),
    topojson   = require("topojson"),
    $          = require("jquery"),
    chroma     =require("chroma-js"),
    _          =require("lodash");

var config = {};
var DATA = require("../utils/data").DATA;
var yearsData = [{"from"   :"2012",
             "to"      :"2013",
             "duration":"2012-13"},
             {"from"   :"2013",
             "to"      :"2014",
             "duration":"2013-14"},
             {"from"   :"2014",
             "to"      :"2015",
             "duration":"2014-15"},
             {"from"   :"2015",
             "to"      :"2016",
                 "duration":"2015-16"}];
// using webpack json loader we can import our topojson file like this
var topodata = require("../../../data/india_states.topo.json");

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
                .scale(["#D5E3FF", "#003171"])
                .domain([0,1]);

var MapTemplate = require("../templates/components/map.jsx");

var MapLeaflet = React.createClass(
    {
        getInitialState: function() {
            return {
                years         : yearsData,
                yearchosen    : {"yearchosen":0},
                allocations   : {},
                topoLayer     : null,
                topojson      : null,
                statetooltip  :{},
                duration      :{"duration":yearsData[0].duration}
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
           this.map = L.map(id,{maxZoom:4.4,minZoom:4.4});
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
                          color:"#555",
                          weight:1,
                          opacity:0.5
                          });
           var _self = this;
           
           var targetlayer = layer;
           layer.on("mouseover",function(e){
                    _self.enterLayer(this);
                    });
           layer.on("mouseout",function(e){
                    _self.leaveLayer(this);
                    });
       },
       getStateIndicatorValue:function(state,indicator,years){
           var stateoutput = _.chain(DATA)
                   .find(function(item){return item.name===state; })
                   .valueOf();
           if(_.isEmpty(stateoutput)){
            return;
           }
           var indicatordetails = _.chain(stateoutput.indicators)
                   .find(function(item){return item.slug===indicator;})
                   .valueOf();
           var indTimeFrame = _.chain(indicatordetails.budgets)
                   .find(function(item){return (item.years.from===years.from && item.years.to === years.to);})
                   .valueOf();
           return indTimeFrame.allocations[0];
       },
       enterLayer:function(layer){
           var getState = layer.feature.properties.NAME_1;
           var getYears = this.state.years[this.state.yearchosen.yearchosen];
           this.setState({
                         statetooltip:{"name":getState},
                         allocations:this.getStateIndicatorValue(getState,this.props.indicator.slug,getYears)
                         });
           layer.bringToFront();
           layer.setStyle({
                         weight:2,
                         opacity: 1
                         });
       },
       leaveLayer:function(layer){
           layer.bringToBack();
           layer.setStyle({
                         weight:1,
                         opacity:0.5
                         });
       
       },
       handleClick(yearchosenvalue){
           this.setState({
                  duration:{"duration":this.state.years[yearchosenvalue]},
                  yearchosen:{"yearchosen":yearchosenvalue}
             });
           var getState = this.state.statetooltip.name;
           var getYears = this.state.years[this.state.yearchosen.yearchosen];
           this.setState({
                         statetooltip:{"name":getState},
                         duration:{"duration":getYears.duration},
                         allocations:this.getStateIndicatorValue(getState,this.props.indicator.slug,getYears)
                         });
       },
        render: function () {
            return MapTemplate(this);
        }
    }
);

module.exports = MapLeaflet;