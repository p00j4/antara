"use strict";

var React        = require("react"),
    ReactD3Basic = require("react-d3-basic");

var BarGroupChart = ReactD3Basic.BarGroupChart;

var graph = function (self) {
  var budgets     = self.getBudgets(),
      // data        = [
      //   {
      //     "be"     : 91947,
      //     "actuals": 79921,
      //     "re"     : 85762,
      //     "from"   : 2009,
      //     "to"     : 2010
      //   },
      // {
      //     "be"     : 91947,
      //     "actuals": 79921,
      //     "re"     : 85762,
      //     "from"   : 2010,
      //     "to"     : 2011
      // },
      // {
      //     "be"     : 91947,
      //     "actuals": 79921,
      //     "re"     : 85762,
      //     "from"   : 2011,
      //     "to"     : 2012
      // },
      // {
      //     "be"     : 91947,
      //     "actuals": 79921,
      //     "re"     : 85762,
      //     "from"   : 2012,
      //     "to"     : 2013
      // }
      // ],
      data = (function(){
          var collectData = [];
          _.each(budgets[0].indicators[0].budgets,function(value){
                var itemData     = {};
                itemData.from    = value.years.from;
                itemData.to      = value.years.to;
                itemData.actuals = 0;
                itemData.re      = 0;
                itemData.be      = 0;
                _.each(value.allocations,function(value2){
                    if(value2.type=="Actuals")
                        itemData.actuals = value2.amount;
                    if(value2.type=="BE")
                        itemData.be = value2.amount;
                    if(value2.type=="RE")
                        itemData.re = value2.amount;
                });
              collectData.push(itemData);
          })
        return collectData;
      })(),
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
