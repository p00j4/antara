"use strict";

var React = require("react"),
    _     = require("lodash");
var DATA = require("../utils/data").DATA;
var Report             = require("./report");

var Embed = React.createClass({
  getInitialState: function () {
    return {
      states            : [],
      indicators        : []
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
      indicators        : indicators
    });
  },
  render: function(){
    var url = window.location.toString();
    return (
      <Report location={this.props.location}
                  params={this.props.params}
                  states={this.state.states}
                  indicators={this.state.indicators}
                  selectedStates={this.state.selectedStates} />
    )
  }
});

module.exports = Embed;