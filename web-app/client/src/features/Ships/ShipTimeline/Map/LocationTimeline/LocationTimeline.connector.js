import { connect } from "react-redux"
import LocationTimeline from "./LocationTimeline"

import * as ship from "../../../../../ducks/ship.duck"

export default connect((state, ownProps) => ({
	tweets: ship.getHistoryByLocation(state, ownProps.location)
}))(LocationTimeline)