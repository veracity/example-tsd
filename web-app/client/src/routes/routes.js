import React from "react"
import { Route, Switch } from "react-router"
import DisplayContainer from "../features/Ships"
import User from "../features/User"
import NotFound from "../features/NotFound"

export const Routes = () => (
	<Switch>
		<Route path="/" exact component={DisplayContainer}/>
		<Route path="/user" exact component={User}/>
		<Route path="/ships/:shipName" exact component={DisplayContainer} />
		<Route component={NotFound}/>
	</Switch>
)
export default Routes