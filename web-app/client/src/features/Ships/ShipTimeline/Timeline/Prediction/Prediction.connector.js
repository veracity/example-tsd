import { connect } from "react-redux"
import Prediction from "./Prediction"

import * as location from "../../../../../ducks/locations.duck"
import * as ship from "../../../../../ducks/ship.duck"

export default connect((state, ownProps) => ({
	location: location.getLocationCoordinates(state, ownProps.havn),
	prediction: ship.getPrediction(state),
	weather: ship.getWeatherData(state),
	errorMessage: ship.getErrorMessage(state)
}), (dispatch) => ({
	fetchPrediction: location => dispatch(ship.fetchPrediction(location))
}))(Prediction)
