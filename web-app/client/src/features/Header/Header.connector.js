import Header from "./Header"
import { connect } from "react-redux"

import * as user from "../../ducks/user.duck"

export default connect((state) => ({
	isLoggedIn: user.isAuthenticated(state),
	userInitials: user.getInitials(state)
}))(Header)