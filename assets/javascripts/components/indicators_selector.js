"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    Fuse     = require("fuse.js");

var IndicatorsSelectorTemplate = require("../templates/components/indicators_selector.jsx");

var IndicatorsSelector = React.createClass({

  getInitialState: function () {
    return {
      indicators       : this.props.indicators,
      selectedIndicator: null,
      indicatorSearch  : new Fuse(this.props.indicators, {keys: ["name"]})
    };
  },

  componentDidMount: function () {
    var self               = this;
    self.setState({
      selectedIndicator: _.find(self.props.indicators, function (indicator) {
        return _.eq(self.props.location.query.indicator, indicator.slug);
      })
    });
    self.onIndicatorSearch = _.debounce(self.onIndicatorSearch, 300);
  },

  getIndicatorLink: function (indicator) {
    return {
      pathname: this.props.location.pathname,
      query   : {
        indicator: indicator.slug,
        states   : _.get(this.props, "location.query.states", "")
      }
    };
  },

  onIndicatorSearch: function (keyword) {
    this.setState({
      indicators: _.isEmpty(keyword) ? this.props.indicators : this.state.indicatorSearch.search(keyword)
    });
  },

  onIndicatorSelection: function (indicator) {
    if (!_.eq(this.props.location.query.indicator, indicator.slug)) {
      this.setState({
        selectedIndicator: indicator
      });
    }
    this.props.onClick();
  },

  render: function () {
    return IndicatorsSelectorTemplate(this);
  }

});

module.exports = IndicatorsSelector;
