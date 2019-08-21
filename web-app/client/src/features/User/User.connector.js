import { connect } from "react-redux"
import User from "./User"

import * as user from "../../ducks/user.duck"

export default connect((state) => ({
	isAuthenticated: user.isAuthenticated(state),
	isLoading: user.isLoading(state),
	id: user.getId(state),
	fullName: user.getFullName(state),
	email: user.getEmail(state)
}), (dispatch) => ({
	onReload: () => dispatch(user.fetchUser())
}))(User)