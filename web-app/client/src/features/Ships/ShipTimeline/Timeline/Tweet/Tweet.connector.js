import { connect } from "react-redux"

import * as locations from "../../../../../ducks/locations.duck"

import Tweet from "./Tweet"

export default connect((state, ownProps) => ({
	coordinates: locations.getLocationCoordinates(state, ownProps.location)
}), (dispatch) => ({
	setLocation: (location) => dispatch(locations.setSelectedLocation(location))
}))(Tweet)