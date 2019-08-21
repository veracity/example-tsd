import React from "react"
import { GoogleMap,
	withScriptjs, 
	withGoogleMap, 
	Marker,
	InfoWindow } from "react-google-maps"
import uuid from "uuid"
import PropTypes from "prop-types"
import mapStyles from "./mapStyles"


import LocationTimeline from "./LocationTimeline"

const Map = (props) => {
	return (
		<GoogleMap
			defaultZoom={6}
			center={props.center}
			defaultOptions={{ styles: mapStyles }}
		>
			{Object.entries(props.locations).map(entry => {
				if(! entry[1]) {
					return
				}
				const lat = parseFloat(entry[1].lat)
				const lng = parseFloat(entry[1].lng)
				return  <Marker key={uuid()} position={{ lat, lng }} onClick={() => props.setLocation({
					name: entry[0],
					coordinates: {
						lat,
						lng
					}
				})}/>
			})}
			{props.selectedLocation && (
				<InfoWindow 
					position={{
						lat: props.selectedLocation.coordinates.lat,
						lng: props.selectedLocation.coordinates.lng
					}}
					onCloseClick={() => props.setLocation(null)}
				>
					<LocationTimeline location={props.selectedLocation.name} />
				</InfoWindow>
			)}
		</GoogleMap>
	)
}

const wrappedMap = withScriptjs(withGoogleMap(Map))

export default wrappedMap

Map.propTypes = {
	locations: PropTypes.object,
	selectedLocation: PropTypes.object,
	center: PropTypes.object,

	setLocation: PropTypes.func
}