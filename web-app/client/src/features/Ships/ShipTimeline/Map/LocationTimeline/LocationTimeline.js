import React from "react"
import PropTypes from "prop-types"

import * as classes from "../Map.scss"

const LocationTimeline = (props) => {
	return (
		<div className={classes.location}>
			<h3 className={classes.locationHeader}>🌍 {props.location}</h3>
			{
				props.tweets.map((story, index) => {
					return(
						<div key={story.id_str} className={classes.tweet} style={{ "borderBottom" : props.tweets.length < index  - 1 ? "solid lightGrey 0.5px" : "0" }}>
							<p style={{ "fontWeight": "500" }}>{story.tweet}</p>
							<span style={{ color: "grey", "fontWeight": "400" }}>{new Date(story.created_at).toUTCString()}</span>
						</div>
					)
				})
			}
		</div>
	)
}

export default LocationTimeline

LocationTimeline.propTypes = {
	tweets : PropTypes.array,
	location: PropTypes.string,
}