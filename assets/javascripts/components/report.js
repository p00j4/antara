"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    domtoimage = require("dom-to-image");

//TODO: need to generate properly
var tempData = require("../../../data/temp.json");
var DATA = require("../utils/data").DATA;

var ReportTemplate = require("../templates/components/report.jsx");

var Report = React.createClass({
  download: function(){
    console.log(domtoimage);
    var report = document.querySelector("#main-container > div > div.content > div.content-body > div.report");
    domtoimage.toSvg(report,{style:{"font-family": "PT Sans"}})
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error("oops, something went wrong!", error);
    });
  },
  getSelectedStatesSlug: function (props) {
    return _.chain(props)
      .get("location.query.states", "")
      .split("|")
      .filter(function (state) {
        return !_.isEmpty(state);
      })
      .valueOf();
  },
  reinitialize: function(props){
    console.log("reinitialized called");
    var self                = this,
        selectedStatesSlugs = self.getSelectedStatesSlug(props);
    var selectedStates = _.chain(props.states)
                          .filter(function (state) {
                            return _.includes(selectedStatesSlugs, state.slug);
                          })
                          .valueOf();
    var selectedIndicator = _.find(props.indicators, function (indicator) {
                                return _.eq(props.location.query.indicator, indicator.slug);
                              })
    self.setState({
      selectedStates   : selectedStates,
      selectedIndicator: selectedIndicator,
      config: this.generateConfig(selectedStates,selectedIndicator)
    });
  },
  transformData: function(budgets){
    var collectData = [];
    if (budgets && budgets.length > 0) {
      _.each(budgets[0].indicators[0].budgets,function(value){
        var itemData     = {};
        itemData.from    = value.years.from;
        itemData.to      = value.years.to;
        itemData.actuals = 0;
        itemData.re      = 0;
        itemData.be      = 0;
        _.each(value.allocations,function(value2){
            if(value2.type=="Actuals")
                itemData.actuals = value2.amount;
            if(value2.type=="BE")
                itemData.be = value2.amount;
            if(value2.type=="RE")
                itemData.re = value2.amount;
        });
        collectData.push(itemData);
      });
    };
    return collectData;
  },
  generateConfig: function(selectedStates,selectedIndicator){
    var budget = this.getBudgets(selectedStates,selectedIndicator);
    var data = this.transformData(budget);
    if (budget.length > 0) {
      return {
        xAxisLabel: budget[0].name,
        yAxisLabel: budget[0].indicators.unit,
        data: data
      };
    } else {
      return [];
    }
  },
  getBudgets: function (selectedStates,selectedIndicator) {
    //TODO: right now hard coded for first state in the array
    if (selectedStates[0] && selectedIndicator) {
      return _.chain(DATA)
        .filter(function (state) {
          return _.includes(selectedStates[0].slug, state.slug);
        })
        .map(function (state) {
          return _.assign(state, {
            indicators: _.chain(state)
              .get("indicators", [])
              .filter(function (indicator) {
                return _.eq(selectedIndicator.slug, indicator.slug);
              })
              .valueOf()
          });
        })
        .valueOf();
    } else {
      return [];
    };
  },
  getInitialState: function () {
    return {
      selectedStates   : [],
      selectedIndicator: {},
      config           : {}
    };
  },
  componentDidMount: function () {
    this.reinitialize(this.props);
  },
  componentWillReceiveProps: function (nextProps) {
    this.reinitialize(nextProps);
  },
  render: function () {
    return ReportTemplate(this);
  }
});

module.exports = Report; 