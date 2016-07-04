"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    Fuse     = require("fuse.js");

var StatesSelectorTemplate = require("../templates/components/states_selector.jsx");

var StatesSelector = React.createClass({

  getInitialState: function () {
    return {
      states        : this.props.states,
      selectedStates: [],
      stateSearch   : new Fuse(this.props.states, {keys: ["name"]})
    };
  },

  componentDidMount: function () {
    var self                = this,
        selectedStatesSlugs = self.getSelectedStatesSlug();
    self.setState({
      selectedStates: _.chain(self.props.states)
        .filter(function (state) {
          return _.includes(selectedStatesSlugs, state.slug);
        })
        .valueOf()
    });
    self.onStateSearch      = _.debounce(self.onStateSearch, 300);
  },

  getSelectedStatesSlug: function () {
    return _.chain(this.props)
      .get("location.query.states", "")
      .split("|")
      .filter(function (state) {
        return !_.isEmpty(state);
      })
      .valueOf();
  },

  getStateLink: function (selectedState) {
    console.log("selectedState",selectedState);
    return {
      pathname: this.props.location.pathname,
      query   : {
        indicator: this.props.location.query.indicator,
        states   : _.chain(this.props)
          .get("location.query.states", "")
          .split("|")
          .filter(function (state) {
            return !_.isEmpty(state);
          })
          .concat(selectedState.slug)
          .uniq()
          .join("|")
          .valueOf()
      }
    };
  },
  removeStateLink: function(removeState){
    return {
      pathname: this.props.location.pathname,
      query   : {
        indicator: this.props.location.query.indicator,
        states   : _.chain(this.props)
          .get("location.query.states", "")
          .split("|")
          .filter(function (state) {
            return !_.isEmpty(state);
          })
          .pull(removeState.slug)
          .uniq()
          .join("|")
          .valueOf()
      }
    };
  },
  onStateRemoval: function(removeState){
    var statesLeft = _.pull(this.state.selectedStates, removeState);
    
    this.setState({
      selectedStates: statesLeft
    });
  },
  onStateSearch: function (keyword) {
    this.setState({
      states: _.isEmpty(keyword) ? this.props.states : this.state.stateSearch.search(keyword)
    });
  },

  onStateSelection: function (state) {
    if (!_.includes(this.getSelectedStatesSlug(), state.slug)) {
      this.setState({
        selectedStates: _.concat(this.state.selectedStates, state)
      });
    }
  },

  render: function () {
    return StatesSelectorTemplate(this);
  }

});

module.exports = StatesSelector;
