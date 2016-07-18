"use strict";

var React       = require("react"),
    ReactDOM    = require("react-dom"),
    ReactRouter = require("react-router"),
    _           = require("lodash");

var Router      = ReactRouter.Router,
    Route       = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory;

var DATA = require("../utils/data").DATA;

var HomePageTemplate = require("../templates/pages/home.jsx");

var HomePage = React.createClass({

  getInitialState: function () {
    return {
      states            : [],
      indicators        : [],
      showSideNavigation: true
    };
  },

  componentWillMount: function () {
    var attributes = ["name", "slug"],
        indicators = _.chain(DATA)
          .first()
          .get("indicators")
          .map(function (indicator) {
            return _.pick(indicator, attributes);
          })
          .valueOf(),
        states     = _.chain(DATA)
          .map(function (state) {
            return _.pick(state, attributes);
          })
          .valueOf();
    this.setState({
      states            : states,
      indicators        : indicators,
      showSideNavigation: _.isEmpty(indicators)
    });
  },

  toggleSideNavigation: function () {
    this.setState({
      showSideNavigation: !this.state.showSideNavigation
    });
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
