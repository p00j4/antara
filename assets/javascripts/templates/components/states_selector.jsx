"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    Link     = require("react-router").Link;

var stateSelectionDisplay = function (self) {
  if (_.isEmpty(self.state.selectedStates)) {
    return (
      <div className="states-selected-inactive">
        No states selected
      </div>
    );
  }
  return (
    <div className="states-selected-active">
      {self.state.selectedStates.map(function(state,i){
        return (
          <div className="state" key={state.slug}> 
            <div className="state-content">
              <span className="state-avtar">{state.name.charAt(0).toUpperCase()}</span>
              <span className="state-name">{state.name}</span>
            </div>
            <span className="state-remove">
              <span className="glyphicon glyphicon-remove"
                onClick={(event) => self.removeState(state)}>
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

var Template = function (self) {
  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <div className="state-selector">
      
      <div className="states">
        <div className="states-header">
          <div className="states-header-title">States</div>
          <div className="dropdown">
            <button id="select-state-dropdown"
                    className="btn btn-default dropdown-toggle btn-bat"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
              Select State &nbsp;
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="select-state-dropdown">
              {self.state.states.map(function (state, stateIndex) {
                return (
                  <li key={stateIndex}>
                    <Link to={self.getStateLink(state)}
                          onClick={(event) => self.onStateSelection(state)}>
                      {state.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="states-selected">
          {stateSelectionDisplay(self)}
        </div>
      </div>
    </div>
    /* jshint ignore:end */
    /* jscs ignore:end */
  );
};

module.exports = Template;
