import React from "react"
import PropTypes from "prop-types"

import * as classes from "./Prediction.scss"

export const Prediction = (props) => {

	if(props.errorMessage){
		return <div>There was an error loading prediction</div>
	}

	if(props.prediction === undefined) {
		props.fetchPrediction(props.location)
		return (
			<div>
				<p>
					Loading prediction for ship
				</p>
			</div>
		)
	}

	const date = new Date(Date.now()).toDateString()
	
	return (
		<div className={classes.prediction}>
			<h4 style={{ "fontWeight": "700" }}>Today&apos;s predictions ({date})</h4>
			<div>
				<p><span style={{ "fontWeight": "600" }}>Current location:</span><span> {props.location.lat}, {props.location.lng}, {props.havn}</span></p>
			</div>
			<div>
				<p style={{ "fontWeight": "600" }}>Today&apos;s weather forecast</p>
				<table>
					<tbody>
						<tr>{Object.keys(props.weather).map(key => <td style={{ "paddingRight" : "5px" }} key={key}>{key.split(":")[0]}</td>)}</tr>
						<tr>{Object.keys(props.weather).map(key => <td style={{ "paddingRight" : "5px" }} key={props.weather[key]}>{props.weather[key]}{key.split(":")[1]}</td>)}</tr>
					</tbody>
				</table>
			</div>
			<div>
				<p style={{ "fontWeight": "600" }}>We believe there is a {props.prediction ? "high" : "low"} chance of something happening today</p>
			</div>
		</div>
	)
}

export default Prediction

Prediction.propTypes = {
	prediction: PropTypes.bool,
	location: PropTypes.object,
	havn: PropTypes.string,
	weather: PropTypes.object,
	errorMessage: PropTypes.string,

	fetchPrediction: PropTypes.func
}