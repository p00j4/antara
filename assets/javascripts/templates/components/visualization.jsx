"use strict";

var React        = require("react"),
    ReactD3Basic = require("react-d3-basic");

var BarGroupChart = ReactD3Basic.BarGroupChart;

var graph = function (self) {
  console.log("self.props",self.props)
  // commenting default assignment, data not refreshing on change, use
  //    localhost:4001/#/?indicator=gross-state-domestic-product-gsdp&states=madhya-pradesh&_k=4fws4v
  // getting initial data to load
    var  data        = self.props.config.data,
      chartSeries = [
          {field: "be",
            name : "Budget Estimate",
            color: "#3CFF33",
            style: {
              "stroke-width"  : 2,
              "stroke-opacity": 0.2,
              "fill-opacity"  : 0.2
            }},
          {field: "re",
              name : "Revised Estimate",
              color: "#33BBFF",
              style: {
                  "stroke-width"  : 2,
                  "stroke-opacity": 0.2,
                  "fill-opacity"  : 0.2
              }},
          {field: "actuals",
              name : "Actuals",
              color: "#C733FF",
              style: {
                  "stroke-width"  : 2,
                  "stroke-opacity": 0.2,
                  "fill-opacity"  : 0.2
              }
      }],
      xScale = "ordinal",
      x = function (d) {
        return d.from +" to "+ d.to;
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
