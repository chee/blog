import {
	GET_POST_DATA_REQUEST,
	GET_POST_DATA_SUCCESS,
	GET_POST_REQUEST,
	GET_POST_SUCCESS
} from './actions'

export function postdata(state = [], action) {
	switch(action.type) {
	case GET_POST_DATA_REQUEST:
		return []
	case GET_POST_DATA_SUCCESS:
		return action.posts.reverse()
	default:
		return state
	}
}

export function posts(state = {}, action) {
	switch(action.type) {
	case GET_POST_REQUEST:
		return state
	case GET_POST_SUCCESS:
		return {
			...state,
			[action.meta.slug]: {
				__html: action.__html,
				meta: action.meta
			}
		}
	default:
		return state
	}
}
