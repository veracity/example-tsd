import React from "react"
import PropTypes from "prop-types"
import * as classes from "../../sidebar.scss"


export const TimePicker = (props) => {
	return(
		<div className={classes.timePicker}>
			<p style={{ "fontWeight": "600" }}>Choose time period</p>
			
			<table>
				<tbody>
					<tr>
						<td>From </td>
						<td>
							<input 
								type="date"
								onChange={e => props.setBefore(e.target.value ? new Date(e.target.value) : new Date("1900-1-1"))} />
						</td>
					</tr>
					<tr>
						<td>To </td>
						<td>
							<input 
								type="date"
								onChange={e => props.setAfter(e.target.value ? new Date(e.target.value) : new Date("2100-1-1"))} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default TimePicker

TimePicker.propTypes = {
	before: PropTypes.instanceOf(Date),
	after: PropTypes.instanceOf(Date),

	setBefore: PropTypes.func,
	setAfter: PropTypes.func,
}