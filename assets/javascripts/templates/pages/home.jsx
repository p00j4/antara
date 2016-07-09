"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom");

var IndicatorsSelector = require("../../components/indicators_selector"),
    StatesSelector     = require("../../components/states_selector"),
    Visualization      = require("../../components/visualization");

var Template = function (self) {
  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <div className="body">
      <div className="bg-primary side-nav">
        <div className="project-info">
          <div className="project-title">CBGA Story Generator</div>
          <div className="project-description">
            Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem
            pretium metus, quis mollis
          </div>
        </div>
        <IndicatorsSelector location={self.props.location}
                            params={self.props.params}
                            indicators={self.state.indicators} />

        <div className="credits">
          <div className="credits-info">
            <span>@credits</span>
            <span href="javascript:void(0)">DataKind Bangalore</span>
          </div>
          <div className="credits-links">
            <span className="credits-links-item">Share</span>
            <span className="credits-links-item">About</span>
            <span className="credits-links-item">ContactUs</span>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="content-body">
          <div className="report">
            <div className="report-header">
              <div className="report-header-left">
                <div className="report-title">Union Budget Value for Year 2014</div>
                <div className="report-subtitle"> select states to explore more</div>
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
            <Visualization location={self.props.location}
                           params={self.props.params}
                           indicators={self.state.indicators}
                           states={self.state.states} />

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
          <div className="report-meta">
            <StatesSelector location={self.props.location}
                            params={self.props.params}
                            states={self.state.states}
                            selectedStates={self.state.selectedStates} />
          </div>
        </div>
        <div className="content-footer">
          <div className="information hr">
            <div className="information-title">Description</div>
            <div className="information-content">
              Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem
              pretium metus, quis mollis
            </div>
          </div>
          <div className="information">
            <div className="information-title">Notes</div>
            <div className="information-content">
              Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem
              pretium metus, quis mollis
            </div>
          </div>
        </div>
      </div>
    </div>
    /* jshint ignore:end */
    /* jscs ignore:end */
  );
};

module.exports = Template;
