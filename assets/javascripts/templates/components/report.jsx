"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom");

var Visualization = require("../../components/visualization");

var Template = function (self) {
  return (
    <div className="report">
      <div className="report-header">
        <div className="report-header-left">
          <div className="report-title">{self.state.selectedIndicator.name}</div>
          {/*<div className="report-subtitle"> select states to explore more</div>*/}
        </div>
        <div className="report-header-right">
          <div className="budget-attributes">
            <div className="budget-attributes-title">Budget Attributes</div>
            <div className="budget-attributes-labels">
              <span className="budget-attribute selected">BE</span>
              <span className="budget-attribute">Ac</span>
              <span className="budget-attribute">RE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mk-viz">
        <Visualization config={self.state.config} />
      </div>

      <div className="report-footer">
        <div className="report-footer-left">
          <div className="report-footer-item"><i>source: </i><a>somelink</a></div>
        </div>
        <div className="report-footer-right">
          <div className="report-footer-item" onClick={(event) => self.download()}>Download&nbsp;|&nbsp;</div>
          <div className="report-footer-item">Embed&nbsp;|&nbsp;</div>
          <div className="report-footer-item">Share</div>
        </div>
      </div>
    </div>
  );
}

module.exports = Template;