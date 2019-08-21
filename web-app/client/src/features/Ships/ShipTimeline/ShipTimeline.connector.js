import { connect } from "react-redux"

import ShipTimeline from "./ShipTimeline"

import * as ship from "../../../ducks/ship.duck"
import * as locations from "../../../ducks/locations.duck"
import * as filters from "../../../ducks/filters.duck"
import * as time from "../../../ducks/time.duck"

export default connect((state) => ({
	history: ship.getHistory(state),
	metadata: ship.getMetadata(state),
	loading: ship.isLoading(state)
}), (dispatch) => ({
	fetchShip: (shipName) => dispatch(ship.fetchShip(shipName)),
	setLocation: (location) => dispatch(locations.setSelectedLocation(location)),
	setTriedFetching: (flag) => dispatch(ship.setTriedFetching(flag)),
	setSidebar: (flag) => dispatch(filters.setShipsSidebar(flag)),
	unsetFilters: () => dispatch(filters.unsetFilters()),
	unsetTime: () => dispatch(time.unsetTime())
}))(ShipTimeline)