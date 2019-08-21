import { connect } from "react-redux"

import DisplayContainer from "./DisplayContainer"

import * as user from "../../ducks/user.duck"

export default connect((state) => ({
	isAuthenticated: user.isAuthenticated(state)
}))(DisplayContainer)