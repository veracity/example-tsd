import { createAction as createReduxAction, handleActions } from "redux-actions"
import axios from "axios"
import { calculateCenterOfCoordinates } from "../../util"
import * as ship from "./ship.duck"



const _ns = "@locations/"
export const getState = globalState => globalState.locations || {}
const createAction = (action, payload) => createReduxAction(_ns + action, payload)

export const setLoading = createAction("SET_LOADING", (flag = true) => flag)
export const isLoading = state => getState(state).loading


export const setLocations = createAction("SET_LOCATIONS")
export const fetchLocations = () => async (dispatch, getState) => {
	const state = getState()
	if(isLoading(state)) return
	dispatch(setLoading())
	
	try {
		const response = await axios({
			url: "/_api/locations"
		})
		const data = response.data || {}
		dispatch(setLocations(data))

	} catch(error) {
		console.log(error)
	} finally {
		dispatch(setLoading(false))
	}
}

export const getLocations = (state) => getState(state).locations || {}

export const getCurrentLocations = (state, all) => {
	const locations = []
	const allLocations = getLocations(state)
	const history = all ? ship.getFullHistory(state) : ship.getHistory(state)
	history.forEach(story => !locations.includes(story.location) && !(story.location == "" || !story.location) ? locations.push(story.location) : null)
	const omittedLocations = {}
	locations.forEach(location => {
		omittedLocations[location] = allLocations[location]
	})
	
	return omittedLocations
}

export const setSelectedLocation = createAction("SET_SELECTED_LOCATION")
export const getSelectedLocation = (state) => getState(state).selectedLocation || null

export const getLocationCoordinates = (state, location) => {
	return getLocations(state)[location] || null
}

export const getCenterOfCoordinates = (state) => {
	const currentLocations = getCurrentLocations(state)
	const coords = Object.keys(currentLocations).map(location => currentLocations[location])
	return calculateCenterOfCoordinates(coords) || { lat: 59.9139, lng: 10.7522 }
}



export const reducer = handleActions({
	[setLoading]: (state, { payload }) => ({
		...state,
		loading: payload
	}),
	[setLocations]: (state, { payload }) => ({
		...state,
		locations: payload
	}),
	[setSelectedLocation]: (state, { payload }) => ({
		...state,
		selectedLocation: payload
	})
}, {})
