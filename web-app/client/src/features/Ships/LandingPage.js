import React from "react"

import * as classes from "./DisplayContainer.scss"

export const LandingPage = () => {
	return (
		<div className={classes.landingPageContainer}>
			<div className={classes.info}>
				<h3>Introduction</h3>
				<p>
					With this application we have attempted to predict a ship from the Norwegian Coast Guard has to go on a mission a given day
					based on its current location, date, as well as the current date. We have based the predictions on tweets made by <a href="twitter.com/NSSR">Redningsselskapet</a> and 
					tried to interperet the tweet to link it to one of the ships in Redningsselskapet&apos;s fleet.
				</p>
				<p>
					For every tweet we have extracted the location of the accident using Azure <a href="https://azure.microsoft.com/nb-no/services/cognitive-services/text-analytics/">Text Analytics</a>,
					and then gathered weather data for that location using the <a href="https://www.meteomatics.com/en/api/overview/">Metomatics</a> weahter API. 
				</p>
				<p>
					If you click on on of the links in the sidebar, you can view the history for the respective ship as well as a prediction for today
					based on the ship&apos;s current location. As this is just a proof of concept, the current location is not correct, but rather a random location, as we were unable to
					access the different ships&apos; AIS data using their MMSI identifier.
				</p>
				<p>
					The prediction model is a simple Decision Tree, and will be improved in the future. As we only had a small set of data, the model is not 100% correct.
				</p>					
			</div>
			<div className={classes.illustration}>
				<img src=""></img>
			</div>
		</div>
	)
}

export default LandingPage