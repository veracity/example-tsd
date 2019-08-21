import { createAction as createReduxAction, handleActions } from "redux-actions"
import axios from "axios"

const _ns ="@ships/"
export const getState = globalState => globalState.ships || {}
const createAction = (action, payload) => createReduxAction(_ns + action, payload)

export const setLoading = createAction("SET_IS_LOADING", (flag = true) => flag)
export const isLoading = state => getState(state).loading

export const setTriedFetching = createAction("SET_TRIED_FETCHING", (flag = true) => flag)
export const hasTriedFetching = state => getState(state).hasTriedFetching

export const setShips = createAction("SET_SHIPS")
export const fetchShips = () => async (dispatch, getState) => {
	const state = getState()
	if(isLoading(state) || hasTriedFetching(state)) return
	dispatch(setLoading())
	try {
		const response = await axios({
			url: "/_api/ships"
		})
		const data = response.data || []
		dispatch(setShips(data.map(ship => ({ shipName: ship.split("/")[1].split(".")[0], ship })).sort( (a, b) => parseInt(b.shipName.split("_")[1]) - parseInt(a.shipName.split("_")[1]))))
	} catch(error) {
		console.log(error)
	} finally {
		dispatch(setTriedFetching(true))
	}
}
export const getShips = (state) => getState(state).ships || [] 


export const reducer = handleActions({
	[setLoading]: (state, { payload }) => ({
		...state,
		loading: payload
	}),
	[setShips]: (state, { payload }) => ({
		...state,
		ships: payload
	}),
	[setTriedFetching]: (state, { payload }) => ({
		...state,
		loading: false,
		hasTriedFetching: payload
	})
}, { hasTriedFetching: false })

export default reducer