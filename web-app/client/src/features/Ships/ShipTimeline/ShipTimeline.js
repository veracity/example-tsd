import React, { Component } from "react"
import PropTypes from "prop-types"



import * as classes from "./ShipTimeline.scss"

import Map from "./Map"
import Timeline from "./Timeline/Timeline"

class ShipTimeline extends Component {
	
	componentDidMount() {
		this.props.fetchShip(this.props.shipName)
	}

	componentDidUpdate(prevProps) {
		if(prevProps.shipName !== this.props.shipName) {
			this.props.setTriedFetching(false)
			this.props.fetchShip(this.props.shipName)
			this.props.setLocation(null)
			this.props.setSidebar(false)
			this.props.unsetFilters()
			this.props.unsetTime()
		}
	}
	
	render() {
		return (
			<div className={classes.container}>
				<Timeline history={this.props.history} shipName={this.props.shipName} metadata={this.props.metadata}/>
				
				<div style={{ "width":"100%", "height":"calc(100vh - 104px)" }}>
					<Map 
						googleMapURL={ "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDVlDNEo1OyZH7x18J2DIPAbaAz7rYZRrg" }
						loadingElement={<div style={{ "height": "100%" }}/>}
						containerElement={<div style={{ "height": "100%" }}/>}
						mapElement={<div style={{ "height": "100%" }}/>}
					>
					</Map>
				</div>
			</div>
		)
	}
}

export default ShipTimeline

ShipTimeline.propTypes = {
	history: PropTypes.array,
	shipName: PropTypes.string,
	loading: PropTypes.bool,
	metadata: PropTypes.object,

	fetchShip: PropTypes.func,
	setLocation: PropTypes.func,
	setTriedFetching: PropTypes.func,
	setSidebar: PropTypes.func,
	unsetFilters: PropTypes.func,
	unsetTime: PropTypes.func,
}