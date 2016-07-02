"use strict";

var React    = require("react"),
    ReactDOM = require("react-dom"),
    Link     = require("react-router").Link;

var listOfIndicator = function(self){
  if(_.isEmpty(self.state.indicators)){
    return (
      <ul className="indicator-list">
        <li className="indicator-list-item nonefound">
          No indicators found with search criteria
        </li>
      </ul>
    );
  }
  return (
    <ul className="indicator-list">
      {self.state.indicators.map(function (indicator, indicatorIndex) {
        return (
          <li className="indicator-list-item" key={indicatorIndex}>
            <Link to={self.getIndicatorLink(indicator)}
                  onClick={(event) => self.onIndicatorSelection(indicator)}
                  className="indicator-list-item-text">
              {indicator.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

var Template = function (self) {

  return (
    /* jshint ignore:start */
    /* jscs ignore:start */
    <div className="indicator">
      <div className="search-box">
        <input type="text" placeholder="Search for schemes or indicator"
               onChange={(event) => self.onIndicatorSearch(event.target.value)} />
      </div>
      <div className="indicator-title">
        <div className="indicator-title-text">CATEGORY</div>
        <div className="clear-all"></div>
      </div>
      {listOfIndicator(self)}
    </div>
    /* jshint ignore:end */
    /* jscs ignore:end */
  );
};

module.exports = Template;
