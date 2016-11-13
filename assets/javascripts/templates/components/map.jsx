    "use strict"
var React = require("react"),
        _ = require('lodash');


var Template=function(self){
    var StateToolTip = function(props){
    if (_.isEmpty(props.statetooltip)){
      return(
        <div className="panel-body">
            <span>Please select a state from the map</span>
        </div>
      )
    }
    return(
        <div className="panel-body">
            <span>{props.statetooltip}</span>
            <br></br>
            <span>{props.allocations.amount.length >0 && props.allocations.amount}</span>
        </div>
      )
    };

    return (
     <div id = 'map'>
        <div className="statetooltip panel panel-info">
            <div className="panel-heading">{self.props.indicator.name}</div>
            <StateToolTip statetooltip={self.state.statetooltip.name} allocations={self.state.allocations}></StateToolTip>
        </div>
        <div className="tcontainer">
            <ul className="timeline">
                {self.state.years.map(function(item,index){
                return (
                    <li className="tparts">
                        <div className="inner"></div>
                        <div className="outer">
                            <input className="step" type="radio" name="radioset"  checked={self.state.duration.duration === item.duration} value={index} onChange={(event) => self.handleClick({index})}/>
                        </div>
                        <label className="tlabel">{item.duration}</label>
                    </li>
                );
                })}
            </ul>
        </div>
    </div>
    )
};


module.exports = Template;