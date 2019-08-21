import { connect } from "react-redux"
import ShipFilters from "./ShipFilters"

import * as filters from "../../../../ducks/filters.duck"
import * as locations from "../../../../ducks/locations.duck"
import * as ship from "../../../../ducks/ship.duck"

export default connect((state) => ({
	filters: filters.getFilters(state),
	locations: locations.getCurrentLocations(state, true),
	locationCounts: ship.getLocationCount(state)
}), (dispatch) => ({
	setShipSidebar: (flag) => dispatch(filters.setShipsSidebar(flag)),
	addFilter: (category, value) => dispatch(filters.addFilter(category, value)),
	removeFilter: (category, value) => dispatch(filters.removeFilter(category, value))
}))(ShipFilters)