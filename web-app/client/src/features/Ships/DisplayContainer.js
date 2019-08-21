import React from "react"
import PropTypes from "prop-types"

import ShipTimeline from "./ShipTimeline"
import LandingPage from "./LandingPage"
import DynamicSidebar from "./DynamicSidebar"

import * as classes from "./DisplayContainer.scss"

export const DisplayContainer = (props) => {
	if(!props.isAuthenticated) {
		return(
			<div>
				<span>
					<p>
						You need to <a href="/login">login</a> to continue
					</p>
				</span>	

				
			</div>
		)
	}
	return (
		<div className={classes.container}>
			<DynamicSidebar shipName={props.match.params.shipName} />
			{props.match.params.shipName ? <ShipTimeline shipName={props.match.params.shipName} /> : <LandingPage /> }
		</div>
	)
}

export default DisplayContainer

DisplayContainer.propTypes = {
	match: PropTypes.object,
	isAuthenticated: PropTypes.bool,
}