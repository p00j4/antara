"use strict";

var React      = require("react"),
    ReactDOM   = require("react-dom"),
    _          = require("lodash"),
    DOMToImage = require("dom-to-image");

var tempData = require("../../../data/temp.json");
var DATA     = require("../utils/data").DATA;

var ReportTemplate = require("../templates/components/report.jsx");

var Report = React.createClass({

  download                 : function () {
    var report = document.querySelector("#main-container > div > div.content > div.content-body > div.report");
    DOMToImage.toSvg(report, {
      "style": {
        "font-family": "PT Sans"
      }
    }).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  },
  getSelectedStatesSlug    : function (props) {
    return _.chain(props)
      .get("location.query.states", "")
      .split("|")
      .filter(function (state) {
        return !_.isEmpty(state);
      })
      .valueOf();
  },
  reinitialize             : function (props) {
    var self                = this,
        selectedStatesSlugs = self.getSelectedStatesSlug(props);
    var selectedStates      = _.chain(props.states)
      .filter(function (state) {
        return _.includes(selectedStatesSlugs, state.slug);
      })
      .valueOf();
    var selectedIndicator   = _.find(props.indicators, function (indicator) {
      return _.eq(props.location.query.indicator, indicator.slug);
    });
    self.setState({
      selectedStates   : selectedStates,
      selectedIndicator: selectedIndicator,
      config           : this.generateConfig(selectedStates, selectedIndicator)
    });
  },
  transformData            : function (budgets) {
    var collectData = [];
    if (budgets && budgets.length == 1) {
      _.each(budgets[0].indicators[0].budgets, function (value) {
        var itemData     = {};
        itemData.from    = value.years.from;
        itemData.to      = value.years.to;
        itemData.actuals = 0;
        itemData.re      = 0;
        itemData.be      = 0;
        _.each(value.allocations, function (value2) {
          if (value2.type == "Actuals")
            itemData.actuals = value2.amount;
          if (value2.type == "BE")
            itemData.be = value2.amount;
          if (value2.type == "RE")
            itemData.re = value2.amount;
        });
        collectData.push(itemData);
      });
    } else {
      _.each(budgets, function (value) {
        var statetemp = value.name;
        var slugtemp  = value.slug;
        _.each(value.indicators[0].budgets, function (value2) {
          var itemData            = {};
          itemData.state          = statetemp;
          itemData.slug           = slugtemp;
          itemData.from           = value2.years.from;
          itemData.to             = value2.years.to;
          itemData[itemData.slug] = 0;
          _.each(value2.allocations, function (value3) {
            if (value3.type == "BE")
              itemData[itemData.slug] = value3.amount;
            collectData.push(itemData);
          });

        })
      })
    }
    return collectData;
  },
  getRandomColor           : function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color   = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  getChartSeries           : function (selectedStates) {
    var chartSeries = [];
    if (selectedStates.length > 1) {
      var self = this;
      _.each(selectedStates, function (selectedState) {
        var item   = {};
        item.field = selectedState.slug;
        item.name  = selectedState.name;
        item.color = self.getRandomColor();
        item.style = {
          "stroke-width"  : 2,
          "stroke-opacity": 0.2,
          "fill-opacity"  : 0.2
        };
        chartSeries.push(item);
      });
    } else {
      chartSeries = [
        {
          field: "be",
          name : "Budget Estimate",
          color: "#3CFF33",
          style: {
            "stroke-width"  : 2,
            "stroke-opacity": 0.2,
            "fill-opacity"  : 0.2
          }
        },
        {
          field: "re",
          name : "Revised Estimate",
          color: "#33BBFF",
          style: {
            "stroke-width"  : 2,
            "stroke-opacity": 0.2,
            "fill-opacity"  : 0.2
          }
        },
        {
          field: "actuals",
          name : "Actuals",
          color: "#C733FF",
          style: {
            "stroke-width"  : 2,
            "stroke-opacity": 0.2,
            "fill-opacity"  : 0.2
          }
        }];
    }
    return chartSeries;
  },
  generateConfig           : function (selectedStates, selectedIndicator) {
    var budget      = this.getBudgets(selectedStates, selectedIndicator);
    var data        = this.transformData(budget);
    var chartSeries = this.getChartSeries(selectedStates);
    if (budget.length > 0) {
      return {
        xAxisLabel : budget[0].name,
        yAxisLabel : budget[0].indicators.unit,
        data       : data,
        chartSeries: chartSeries
      };
    } else {
      return [];
    }
  },
  getBudgets               : function (selectedStates, selectedIndicator) {
    // Filter based on the chosen states, right now only one indicator is supported
    if (selectedStates && selectedIndicator) {
      return _.chain(DATA)
        .filter(function (state) {
          return _.includes(_.map(selectedStates, function (item) {
            return item.slug;
          }), state.slug);
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
    }
  },
  getInitialState          : function () {
    return {
      selectedStates   : [],
      selectedIndicator: {},
      config           : {}
    };
  },
  componentDidMount        : function () {
    this.reinitialize(this.props);
  },
  componentWillReceiveProps: function (nextProps) {
    this.reinitialize(nextProps);
  },
  render                   : function () {
    return ReportTemplate(this);
  }
});

module.exports = Report; 
