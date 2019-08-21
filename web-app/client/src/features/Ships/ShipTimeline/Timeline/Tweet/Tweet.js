import React from "react"
import PropTypes from "prop-types"

import * as classes from "../Timeline.scss"

export const Tweet = ({ created_at, tweet, location, coordinates, setLocation }) => {
	const date = new Date(created_at)

	return (
		<div className={classes.tweet}>
			<p>{tweet}</p>
			<p>
				<span className={`${classes.descriptionContent} ${classes.heavy}`}>Date: </span>
				<span style={{ "marginRight": "25px" }} className={`${classes.descriptionContent} ${classes.light}`}>{`${date.toUTCString().slice(0,22)}\t`}</span>
				<span className={`${classes.descriptionContent} ${classes.heavy}`} >
					Location: {" "}
				</span>
				{(location === null || location === "") ? 
					<span className={`${classes.descriptionContent} ${classes.light}`}>There is no available location for tweet</span> :
					<span className={`${classes.descriptionContent} ${classes.light} ${classes.locationLink}`} onClick={() => setLocation({
						name: location,
						coordinates: {
							lat: parseFloat(coordinates.lat),
							lng: parseFloat(coordinates.lng)
						}
					})}>{location}</span>
				}
			</p>
		</div>
	)
}

export default Tweet

Tweet.propTypes = {
	created_at: PropTypes.string,
	tweet: PropTypes.string,
	location: PropTypes.string,
	coordinates: PropTypes.object,

	setLocation: PropTypes.func
}