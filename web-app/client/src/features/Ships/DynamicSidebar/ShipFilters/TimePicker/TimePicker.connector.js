import { connect } from "react-redux"
import TimePicker from "./TimePicker"
import * as time from "../../../../../ducks/time.duck"

export default connect((state) => ({
	before: time.getBefore(state),
	after: time.getAfter(state)
}), (dispatch) => ({
	setBefore: date => dispatch(time.setBefore(date)),
	setAfter: date => dispatch(time.setAfter(date))
}))(TimePicker)