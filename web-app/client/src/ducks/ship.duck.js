import { createAction as createReduxAction, handleActions } from "redux-actions"
import axios from "axios"
import omit from "lodash/omit"


import * as filters from "./filters.duck"
import * as time from "./time.duck"


const _ns = "@ship/"
export const getState = globalState => globalState.ship || {}
const createAction = (action, payload) => createReduxAction(_ns + action, payload)

export const setLoading = createAction("SET_LOADING", (flag = true) => flag)
export const isLoading = state => getState(state).loading

export const setTriedFetching = createAction("SET_TRIED_FETCHING", (flag = true) => flag)
export const hasTriedFetching = state => getState(state).hasTriedFetching

export const setErrorMessage = createAction("SET_ERROR_MESSAGE")
export const getErrorMessage = state => getState(state).errorMessage || null

export const setShip = createAction("SET_SHIP")
export const fetchShip = (shipname) => async (dispatch, getState) => {
	const state = getState()
	if(isLoading(state) || hasTriedFetching(state)) return
	dispatch(setLoading())
	try {
		const response = await axios({
			url: "/_api/ship",
			headers: {
				shipname
			}
		})
		const data = response.data
		dispatch(setShip(data))
	} catch (error) {
		console.log(error)
	} finally {
		dispatch(setTriedFetching())
	}
}

export const getFullHistory = state => getState(state).history || []

export const getHistory = state => {
	const before = time.getBefore(state)
	const after = time.getAfter(state)
	const allFilters = filters.getFilters(state)
	if(Object.keys(allFilters).length > 0){
		let history = []
		getState(state).history.forEach(story => {
			const date = new Date(story.created_at)
			Object.keys(allFilters).forEach(filter => {
				if(allFilters[filter].includes(story[filter]) && date > before && date < after) {
					history.push(story)
				}
			})
		})
		return history || []
	} else { 
		return getFullHistory(state).filter(story => {
			const date = new Date(story.created_at) 
			return date > before && date < after
		})
	}
}

export const getLocationCount = (state) => {
	const history = getFullHistory(state)
	let counts = {}
	history.forEach(story => {
		counts[story["location"]] !== undefined ? counts[story["location"]]++ : counts[story["location"]] = 1	
	})
	return counts
}

export const getMetadata = (state) => getState(state).metadata

export const getHistoryByLocation = (state, location) => getHistory(state).filter(story => story.location === location) || []


export const setPrediction = createAction("SET_PREDICTION")
export const unsetPrediction = createAction("UNSET_PREDICTION")

export const fetchPrediction = (location) => async (dispatch, getState) => {
	const state = getState()
	if(isLoading(state)) return
	dispatch(setLoading())
	try {
		const response = await axios({
			url: "/_api/ship/predict",
			headers: {
				lat: location.lat,
				lng: location.lng
			}
		})
		dispatch(setPrediction(response.data))
	} catch(error) {	
		dispatch(setErrorMessage(error.response.data))
	} finally {
		dispatch(setLoading(false))
	}
}

export const getPrediction = (state) => getState(state).prediction
export const getWeatherData = (state) => getState(state).weather || {}


export const reducer = handleActions({
	[setLoading]: (state, { payload }) => ({
		...state,
		loading: payload
	}),
	[setShip]: (state, { payload }) => ({
		...state,
		history: payload.history,
		metadata: payload.metadata,
		prediction: undefined,
		weather: undefined,
		currentLocation: undefined
	}),
	[setTriedFetching]: (state, { payload }) => ({
		...state,
		loading: false,
		hasTriedFetching: payload
	}),
	[setPrediction]: (state, { payload }) => ({
		...state,
		prediction: payload.prediction,
		weather: payload.weather,
		currentLocation: payload.currentLocation
	}),
	[unsetPrediction]: (state) => ({
		state: omit(state, ["prediction"])
	}),
	[setErrorMessage]: (state, { payload }) => ({
		...state,
		errorMessage: payload
	})
}, { hasTriedFetching: false })

export default reducer