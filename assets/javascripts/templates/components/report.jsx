"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    $          = require("jquery");

var Visualization = require("../../components/visualization");
var MapLeaflet = require("../../components/map");
var ReportFooter = require("../../components/report_footer");

var Template = function (self) {
  
  if (_.isEmpty(self.state.selectedIndicator)) {
    return (
      <div className="report">
        <span className="report-message">
          Please Select an indicator
        </span>
      </div>
    );
  }
  if (_.isEmpty(self.state.selectedStates)) {
    return (
      <div className="report">
        <div className="report-header">
          <div className="report-header-left">
            <div className="report-title">{self.state.selectedIndicator.name}</div>
          </div>
          <div className="report-header-right">
            <div className="budget-attributes">
              <div className="budget-attributes-title">Budget Attributes</div>
              <div className="budget-attributes-labels">
                <span className="budget-attribute selected">BE</span>
                <span className="budget-attribute">AC</span>
                <span className="budget-attribute">RE</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mk-viz">
            <MapLeaflet indicator={self.state.selectedIndicator}/>
        </div>
        
        <ReportFooter />
      </div>
    );
  }
  return (
    <div className="report">
      <div className="report-header">
        <div className="report-header-left">
          <div className="report-title">{self.state.selectedIndicator.name}</div>
        </div>
        <div className="report-header-right">
          <div className="budget-attributes">
            <div className="budget-attributes-title">Budget Attributes</div>
            <div className="budget-attributes-labels">
              <span className="budget-attribute selected">BE</span>
              <span className="budget-attribute">AC</span>
              <span className="budget-attribute">RE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mk-viz">
        <Visualization config={self.state.config} />
      </div>
      <ReportFooter />
    </div>
  );
};

module.exports = Template;
