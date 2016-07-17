"use strict";

var React        = require("react"),
    ReactD3Basic = require("react-d3-basic");

var BarGroupChart = ReactD3Basic.BarGroupChart;

var graph = function (self) {
  // commenting default assignment, data not refreshing on change, use
  //    localhost:4001/#/?indicator=gross-state-domestic-product-gsdp&states=madhya-pradesh&_k=4fws4v
  // getting initial data to load
    var  data        = self.props.config.data,
      chartSeries = self.props.config.chartSeries,
      xScale = "ordinal",
      x = function (d) {
        return d.from +" to "+ d.to;
      };
  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <BarGroupChart
        margins={margins}
        width={900}
        height={400}
        data={data}
        chartSeries={chartSeries}
        x={x}
        xScale = {xScale}/>
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
