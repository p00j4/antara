"use strict"
var React = require("react");

var Template=function(self){
    return(
            <div id = 'map'>
                <div className="statetooltip">{self.state.statetooltip.name}</div>
            </div>
    );
};

module.exports = Template;