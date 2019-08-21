import React, { Component }from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import * as classes from "../sidebar.scss"

class ShipsList extends Component {

	state = {
		searchBar: ""
	}

	handleInputChange = (e) => {this.setState({ [e.target.id]: e.target.value })}

	render() {
		if(this.props.ships.length === 0) {
		
			this.props.fetchShips()
			return (
				<div className={classes.container}>Loading ships...</div>
			)
		}
		return (
			<div className={classes.container}>
				<div className={classes.searchBar}>
					<input className={`${classes.searchBar}`} type="text" placeholder=" Search for a ship" id="searchBar" onChange={e => this.handleInputChange(e)} />

				</div>
				{this.props.ships.map(ship => {
					let isActive = 400
					if (this.props.shipName) {
						isActive = this.props.shipName.replace(".json", "") === ship.shipName ? "600" : "400"
					}
					return (
						ship.shipName.toLowerCase().includes(this.state.searchBar.toLowerCase()) ? 
							<Link 
								className={classes.shiplink} 
								style={{ "fontWeight": `${isActive}` }} 
								key={ship.ship} 
								to={`/${ship.ship}`}>
								{ship.shipName.replace(/_/g," ")}
							</Link> 
							: 
							null
					)
				})}

			</div>
		)
	}
} 

export default ShipsList

ShipsList.propTypes = {
	ships: PropTypes.array,
	shipName: PropTypes.string,

	fetchShips: PropTypes.func,
	setShipSidebar: PropTypes.func
}