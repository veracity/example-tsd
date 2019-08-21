import React, { Component } from "react"
import * as classes from "../sidebar.scss"
import PropTypes from "prop-types"

import TimePicker from "./TimePicker"

class ShipFilters extends Component {
	
	changeFilter = (category, e) => {
		!e.target.checked ? this.props.removeFilter(category, e.target.value) : this.props.addFilter(category, e.target.value)
	} 
	

	render() {
		return (
			<div className={classes.container}>
				<div className={classes.title} onClick={() => this.props.setShipSidebar(true)}>
					<h4 className={classes.titleText}>Back to ships</h4>
				</div>
				<div className={classes.checkBox}>
					<p>Locations</p>
					{Object.keys(this.props.locations).map(location => (
						<div className={classes.filter} key={location}>

							<span>
								<input 
									type="checkbox"  
									value={location} 
									onChange={(e) => this.changeFilter("location", e)}
									defaultChecked={this.props.filters["location"] !== undefined ? this.props.filters["location"].includes(location) : false}	
								/>
								{`  ${location}`} ({this.props.locationCounts[location]})
							</span>
						</div>
					))}
				</div>
				<TimePicker />
			</div>
		)
	}
}

export default ShipFilters

ShipFilters.propTypes = {
	locations: PropTypes.object,
	filters: PropTypes.object,
	locationCounts: PropTypes.object,

	setShipSidebar: PropTypes.func,
	addFilter: PropTypes.func,
	removeFilter: PropTypes.func,
}