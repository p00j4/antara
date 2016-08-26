"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    _        = require("lodash"),
    $          = require("jquery"),
    ReactSocial = require("react-social");

var Visualization = require("../../components/visualization");

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
        <span className="report-message">
          Please Select at-least one state
        </span>
      </div>
    );
  }
  var url = window.location.href;
  
  var tempArray = url.split("#");
  var embedString = "#/embed";
  var embedUrl = tempArray[0] + embedString + tempArray[1];

  var TwitterButton = ReactSocial.TwitterButton;
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

      <div className="report-footer">
        <div className="report-footer-left">
          <div className="report-footer-item">
            <span className="text-italic">source: </span>
            <a href="javascript: void(0);">link</a>
          </div>
        </div>
        <div className="report-footer-right">
          <div className="report-footer-item" onClick={(event) => self.onDownload()}>
            Download&nbsp;|&nbsp;
          </div>
          <div className="report-footer-item" data-toggle="modal" data-target="#embed">
            Embed&nbsp;|&nbsp;
          </div>
          <div className="report-footer-item">
            <TwitterButton url={url}>tweet</TwitterButton>
          </div>
        </div>
      </div>
      <div className="modal fade" id="embed" tabindex="-1" role="dialog" aria-labelledby="embed">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="embedLabel">Embed Url</h4>
            </div>
            <div className="modal-body">
              <textarea className="embed-url" value={embedUrl} autofocus></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = Template;
