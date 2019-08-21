import { createAction as createReduxAction, handleActions } from "redux-actions"
import omit from "lodash/omit"


const _ns ="@filters/"
export const getState = globalState => globalState.filters || {}
const createAction = (action, payload) => createReduxAction(_ns + action, payload)

export const setShipsSidebar = createAction("SET_SHIP_SIDEBAR")
export const isShipsSidebar = state => getState(state).isShipsSidebar

export const unsetFilters = createAction("UNSET_FILTERS")
export const setFilters = createAction("SET_FILTERS")
export const addFilter = (category, value) => (dispatch, getState) => {
	const state = getState()
	const filters = JSON.parse(JSON.stringify(getFilters(state)))
	filters[category] = filters[category] ? [...filters[category], value] : [value]
	dispatch(setFilters(filters))
}

export const removeFilter = (category, value)  => (dispatch, getState) => {
	const state = getState()
	let filters = JSON.parse(JSON.stringify(getFilters(state)))
	filters[category].length === 1 ? filters = omit(filters, [category]) : filters[category] =  filters[category].filter(v => v !== value)
	dispatch(setFilters(filters))
}

export const getFilters = state => getState(state).filters || {}
export const getFilterByKey = (state, key) => getFilters(state)[key] || {} 


export const reducer = handleActions({
	[setShipsSidebar]: (state, { payload }) => ({
		...state,
		isShipsSidebar: payload
	}),
	[unsetFilters]: (state) => ({
		...state,
		filters: {}
	}),
	[setFilters]: (state, { payload }) => ({
		...state,
		filters: payload
	})
}, {})