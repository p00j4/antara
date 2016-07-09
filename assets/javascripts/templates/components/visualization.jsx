"use strict";
// ReactD3Basic = require("react-d3-basic"),
var React        = require("react"),
    ReactD3      = require("react-d3-components"),
    $            = require("jquery");

var LineChart = ReactD3.LineChart;

var graph = function (self) {
  var BarChart = ReactD3.BarChart;

  var config = self.props.config;
  // var width = self.state.containerWidth;
  // var height = self.state.containerHeight;
  //TODO: figure out way to pass sizes from util
  var width = $(".mk-viz").width();
  var height = $(".mk-viz").height();
  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
      /* <BarChart
      groupedBars
      data={config.data}
      width={width}
      height={height}
      xAxis={{label:config.xAxisLabel}}
      yAxis={{label:config.yAxisLabel}}
      margin={{top: 10, bottom: 50, left: 50, right: 10}} /> */
      <div>Place holder for graphs </div>
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
