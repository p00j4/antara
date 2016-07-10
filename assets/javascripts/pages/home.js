"use strict";

var React       = require("react"),
    ReactDOM    = require("react-dom"),
    ReactRouter = require("react-router"),
    _           = require("lodash"),
    $           = require("jquery");

var Router      = ReactRouter.Router,
    Route       = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory;

var DATA = require("../utils/data").DATA;

var HomePageTemplate = require("../templates/pages/home.jsx");

var HomePage = React.createClass({

  getInitialState: function () {
    return {
      states    : [],
      indicators: [],
      showSideNav: true
    };
  },
  componentWillMount: function () {
    var indicators = _.chain(DATA)
        .first()
        .get("indicators")
        .map(function (indicator) {
          return _.pick(indicator, ["name", "slug"]);
        })
        .valueOf();
    this.setState({
      states    : _.chain(DATA)
        .map(function (state) {
          return _.pick(state, ["name", "slug"]);
        })
        .valueOf(),
      indicators: indicators,
      showSideNav: indicators.length > 0 ? false : true
    });
  },
  changeNavState: function(){
    this.setState({
      showSideNav: !this.state.showSideNav
    })
  },
  render: function () {
    return HomePageTemplate(this);
  }
});

/* istanbul ignore next */
var homePage = function (container) {
  return ReactDOM.render(
    React.createElement(Router, {
      history: hashHistory,
      routes : require("../utils/routes")(HomePage)
    }),
    document.getElementById(container));
};

module.exports = {
  Component: HomePage,
  DOM      : homePage
};
