import { createAction as createReduxAction, handleActions } from "redux-actions"
import omit from "lodash/omit"

const _ns = "@time/"
export const getState = globalState => globalState.time || {}
const createAction = (action, payload) => createReduxAction(_ns + action, payload)

export const setBefore = createAction("SET_BEFORE")
export const setAfter = createAction("SET_AFTER")
export const unsetTime = createAction("UNSET_TIME")

export const getBefore = state => getState(state).before || new Date("1900-1-1")
export const getAfter = state => getState(state).after || new Date("2100-1-1") 

export const reducer = handleActions({
	[setBefore]: (state, { payload }) => ({
		...state,
		before: payload
	}),
	[setAfter]: (state, { payload }) => ({
		...state,
		after: payload
	}),
	[unsetTime]: (state) => ({
		state: omit(state, ["before", "after"])
	})
}, {})