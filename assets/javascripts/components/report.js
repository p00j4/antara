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
    var self                = this,
        selectedStatesSlugs = self.getSelectedStatesSlug(props);
    self.setState({
      selectedStates   : _.chain(props.states)
        .filter(function (state) {
          return _.includes(selectedStatesSlugs, state.slug);
        })
        .valueOf(),
      selectedIndicator: _.find(props.indicators, function (indicator) {
        return _.eq(props.location.query.indicator, indicator.slug);
      }),
      config: this.generateConfig()
    });
  },
  transformData: function(budgets){
    return tempData;
  },
  generateConfig: function(){
    var budget = this.getBudgets()[0];
    var data = this.transformData();
    if (budget) {
      return {
        xAxisLabel: budget.name,
        yAxisLabel: budget.indicators.unit,
        data: data
      };
    } else {
      return [];
    }
  },
  getBudgets: function () {
    var self                = this,
        selectedStatesSlugs = self.getSelectedStatesSlug(self.props);
    return _.chain(DATA)
      .filter(function (state) {
        return _.includes(selectedStatesSlugs, state.slug);
      })
      .map(function (state) {
        return _.assign(state, {
          indicators: _.chain(state)
            .get("indicators", [])
            .filter(function (indicator) {
              return _.eq(self.props.location.query.indicator, indicator.slug);
            })
            .valueOf()
        });
      })
      .valueOf();
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