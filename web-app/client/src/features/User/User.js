import React from "react"
import PropTypes from "prop-types"

export const User = ({ isAuthenticated, isLoading, id, fullName, email, onReload }) => {
	if (!isAuthenticated) return (
		<div>Please <a href="/login">log in</a> and revisit this page.</div>
	)
	
	return (
		<table>
			<tbody>
				<tr>
					<td>ID</td>
					<td>{id}</td>
				</tr>
				<tr>
					<td>Full name</td>
					<td>{fullName}</td>
				</tr>
				<tr>
					<td>Email</td>
					<td>{email}</td>
				</tr>
				<tr>
					<td>Refresh</td>
					<td><button onClick={onReload}>Refresh user data</button>{isLoading && (<span>Loading... </span>)}</td>
				</tr>
				<tr>
					<td>Log out</td>
					<td><a href="/logout">Log out</a></td>
				</tr>
			</tbody>
		</table>
	)
}
User.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
	id: PropTypes.string,
	fullName: PropTypes.string,
	email: PropTypes.string,

	onReload: PropTypes.func
}
export default User
