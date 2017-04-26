import React from 'react';
import RightSidebar from '../rightsidebar/RightSidebar';
import Choropleth from "../visualization/Choropleth";
import GraphComponent from "../visualization/GraphComponent";
import { expenditure_data } from "../../data/expenditure_data";

const exp_data = expenditure_data;
class MainViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            budgetAttr:"BE",
            viewBy: "choropleth",
            sectorSelected:null, 
            figData: exp_data, 
            indicatorData: null };
        this.handleChange = this.handleChange.bind(this);
        this.onChangeBudgetAttr =this.onChangeBudgetAttr.bind(this);
    }

    componentWillMount() {
        const indicator_data = this.state.figData.find((sector) => {
                return this.props.params.sector == sector.slugSector;
            }).subIndicators.find((indicator) => {
                return this.props.params.indicator == indicator.slugIndicator;
            });
        this.setState({indicatorData:indicator_data, sectorSelected:this.props.params.sector});
    }

    componentDidUpdate(prevProps, prevState) {
        const indicator_data = this.state.figData.find((sector) => {
                return this.props.params.sector == sector.slugSector;
            }).subIndicators.find((indicator) => {
                return this.props.params.indicator == indicator.slugIndicator;
            });
        if(prevState.indicatorData != indicator_data){
            this.setState({indicatorData:indicator_data});
        }
    }

    handleChange(value){
        this.setState({ viewBy: value });
    }

    onChangeBudgetAttr(value){
        this.setState({ budgetAttr :value});
    }
   
    render() {
        return ( 
            <div>
                <div className = "col-lg-10" >
                    <div className = "vis-container" >
                    {
                        this.state.viewBy == "choropleth" ? ( 
                            <Choropleth data={this.state.indicatorData} attrType={this.state.budgetAttr} selectedIndicator={this.state.indicatorData.indicator} selectedSector = {this.state.sectorSelected}/> ) 
                        :(
                            <GraphComponent data={this.state.indicatorData} attrType={this.state.budgetAttr} selectedIndicator={this.state.indicatorData.indicator} selectedSector = {this.state.sectorSelected} /> )
                    }
                    </div>
                </div>
                <div className = "col-lg-2 rightsidebar" >
                    <RightSidebar viewByChange={this.handleChange} budgetAttrChange={this.onChangeBudgetAttr}/> 
                </div>
            </div>
            );
        }
    }

MainViewComponent.propTypes = {
   params: React.PropTypes.object
};

export default MainViewComponent;
