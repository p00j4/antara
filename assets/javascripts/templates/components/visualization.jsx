"use strict";

var React        = require("react"),
    ReactD3Basic = require("react-d3-basic"),
    ReactD3ToolTip = require("react-d3-tooltip"),
    SimpleTooltipStyle = require('react-d3-tooltip').SimpleTooltip;

//var BarGroupChart = ReactD3Basic.BarGroupChart;
var BarGroupChart = ReactD3ToolTip.BarGroupTooltip;
var graph = function (self) {
  var data        = self.props.config.data,
      chartSeries = self.props.config.chartSeries,
      xScale      = "ordinal",
      x           = function (year) {
        return year.from + " to " + year.to;
      };
  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <BarGroupChart
      width={900}
      height={400}
      data={data}
      chartSeries={chartSeries}
      x={x}
      xScale={xScale}
      showXGrid={false}
      showYGrid={false}>
        <SimpleTooltipStyle/>
        </BarGroupChart>
    /* jshint ignore:end */
    /* jscs ignore:end */
  );
};

var Template = function (self) {
  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <div className="report-body">
      <div className="graph">
        {graph(self)}
      </div>
    </div>
    /* jshint ignore:end */
    /* jscs ignore:end */
  );
};

module.exports = Template;
