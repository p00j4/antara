"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    Fuse     = require("fuse.js");

var StatesSelectorTemplate = require("../templates/components/states_selector.jsx");

var StatesSelector = React.createClass({

  getDefaultProps: function () {
    return {
      maximumStatesCount: 5
    };
  },

  getInitialState: function () {
    return {
      states        : this.props.states,
      selectedStates: [],
      stateSearch   : new Fuse(this.props.states, {
        keys: ["name"]
      })
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

  canAddState: function () {
    return (_.size(this.state.selectedStates) < this.props.maximumStatesCount);
  },

  addStateLink: function (selectedState) {
    var states = _.chain(this.props)
      .get("location.query.states", "")
      .split("|")
      .filter(function (state) {
        return !_.isEmpty(state);
      })
      .valueOf();
    if (this.canAddState()) {
      states = _.concat(states, _.get(selectedState, "slug", ""));
    }
    return {
      pathname: this.props.location.pathname,
      query   : {
        indicator: this.props.location.query.indicator,
        states   : _.chain(states)
          .uniq()
          .join("|")
          .valueOf()
      }
    };
  },

  onStateAddition: function (state) {
    if (!_.includes(this.getSelectedStatesSlug(), state.slug) && this.canAddState()) {
      this.setState({
        selectedStates: _.concat(this.state.selectedStates, state)
      });
    }
  },

  removeStateLink: function (state) {
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
          .pull(_.get(state, "slug"))
          .uniq()
          .join("|")
          .valueOf()
      }
    };
  },

  onStateRemoval: function (state) {
    this.setState({
      selectedStates: _.pull(this.state.selectedStates, state)
    });
  },

  onStateSearch: function (keyword) {
    this.setState({
      states: _.isEmpty(keyword) ? this.props.states : this.state.stateSearch.search(keyword)
    });
  },

  render: function () {
    return StatesSelectorTemplate(this);
  }

});

module.exports = StatesSelector;
