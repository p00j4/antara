import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App" ;
import MainViewComponent from "./components/home/MainViewComponent";
//import {expenditure_data} from "./data/expenditure_data";
import IndexComponent from "./components/indexcomponent/IndexComponent";

export default(
<Route path="/" components={App}>
	<IndexRoute components={IndexComponent} />
	<Route path="/expenditure/:sector/:indicator" component={MainViewComponent}  />
</Route>
);