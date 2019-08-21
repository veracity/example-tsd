import { connect } from "react-redux"
import Map from "./Map"

import * as locations from "../../../../ducks/locations.duck"


export default connect((state) => ({
	locations: locations.getCurrentLocations(state, false),
	selectedLocation: locations.getSelectedLocation(state),
	center: locations.getCenterOfCoordinates(state)
}), (dispatch => ({
	setLocation: (location) => dispatch(locations.setSelectedLocation(location))
})))(Map)