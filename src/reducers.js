import {
  FETCH_POST_LIST_SUCCESS,
  FETCH_POST_SUCCESS
} from './actions'

export function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POST_LIST_SUCCESS:
      return [
        ...state,
        ...action.posts
      ]
    case FETCH_POST_SUCCESS:
      return [
        ...state.map(post => (
      post.slug === action.slug ? {
        ...post,
        html: action.html,
        fetched: true
      } : post
    ))]
    default:
      return state
  }
}
