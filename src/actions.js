/* global fetch */
import 'isomorphic-fetch'
import showdown from 'showdown'

export const FETCH_POST_LIST_REQUEST = 'FETCH_POSTS_LIST_REQUEST'
export const FETCH_POST_LIST_SUCCESS = 'FETCH_POSTS_LIST_SUCCESS'
export const FETCH_POST_LIST_FAILURE = 'FETCH_POSTS_LIST_FAILURE'

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'

const converter = new showdown.Converter()

export function fetchPostList () {
  return (dispatch, getState) => {
    dispatch({type: FETCH_POST_LIST_REQUEST})
    const {posts} = getState()
    if (posts.length) {
      return Promise.resolve({posts})
    }
    return fetch('/posts.json')
      .then(response => response.json())
      .then(posts => dispatch({
        type: FETCH_POST_LIST_SUCCESS,
        posts: posts.reverse()
      }))
      .catch(error => dispatch({type: FETCH_POST_LIST_FAILURE, error}))
  }
}

export function fetchPost (slug) {
  return (dispatch, getState) => {
    dispatch({type: FETCH_POST_REQUEST})
    const {posts} = getState()
    const post = posts.filter(({slug: innerSlug}) => slug === innerSlug)[0]
    if (post && post.fetched) {
      return Promise.resolve(dispatch({
        type: FETCH_POST_SUCCESS,
        ...post
      }))
    }
    return fetch(`/blogs/${slug}.md`)
      .then(response => response.text())
      .then(post => converter.makeHtml(post))
      .then(html => dispatch({
        type: FETCH_POST_SUCCESS,
        html,
        slug
      }))
      .catch(error => dispatch({
        type: FETCH_POST_FAILURE, error
      }))
  }
}
