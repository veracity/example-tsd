import React, { Component } from "react"
import uuid from "uuid"
import * as classes from "./Timeline.scss"

import PropTypes from "prop-types"
import Prediction from "./Prediction"
import Tweet from "./Tweet"

class Timeline extends Component {

	render() {
		const { history } = this.props
		return (
			<div className={classes.timelineContainer}>
				<div className={classes.header}><h3>⚓ {this.props.shipName.replace(/_/g, " ").replace(".json", "")}</h3></div>
				{this.props.metadata && <Prediction havn={this.props.metadata.Havn} />}
				<div styles={{ "font-weight": "600" }}>
					<h4>{this.props.shipName.replace(/_/g, " ").replace(".json", "")}&apos;s Timeline</h4>
				</div>
				<div className={classes.tweetsContainer}>
					{history.map(story => {
						return (
							<Tweet key={uuid()} created_at={story.created_at} tweet={story.tweet} location={story.location}/>
						)
					})}
				</div>
			</div>
		)
	}
}

export default Timeline

Timeline.propTypes = {
	history: PropTypes.array,
	shipName: PropTypes.string,
	metadata: PropTypes.object
}