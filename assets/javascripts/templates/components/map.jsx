"use strict"
var React = require("react"),
        _ = require('lodash');

var Template=function(self){
            if (_.isEmpty(self.state.statetooltip.name)){
                return (
                 <div id = 'map'>
                    <div className="statetooltip panel panel-info">
                            <div className="panel-heading">{self.props.indicator.name}</div>
                            <div className="panel-body">
                                <span>Please select a state from the map</span>
                            </div>
                    </div>
                 </div>
                );
            }
            {
             return(
            <div id = 'map'>
                <div className="statetooltip panel panel-info">
                        <div className="panel-heading">{self.props.indicator.name}</div>
                        <div className="panel-body">
                            <span>{self.state.statetooltip.name}</span>
                            <br></br>
                            <span>{self.state.allocations.amount.length >0 && self.state.allocations.amount}</span>
                        </div>
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
        )};
};

module.exports = Template;