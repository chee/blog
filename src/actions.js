export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'

export const GET_POST_REQUEST = 'GET_POST_REQUEST'
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const GET_POST_FAILURE = 'GET_POST_FAILURE'

export const GET_POST_DATA_REQUEST = 'GET_POSTS_DATA_REQUEST'
export const GET_POST_DATA_SUCCESS = 'GET_POSTS_DATA_SUCCESS'
export const GET_POST_DATA_FAILURE = 'GET_POSTS_DATA_FAILURE'

import 'isomorphic-fetch'
import showdown from 'showdown'

const converter = new showdown.Converter()

export function getPostdata() {
  return dispatch => {
    dispatch({type: GET_POST_DATA_REQUEST})
    return fetch('/posts.json')
      .then(response => response.json())
      .then(posts => dispatch({type: GET_POST_DATA_SUCCESS, posts}))
      .catch(error => dispatch({type: GET_POST_DATA_FAILURE, error}))
  }
}

function fetchPost(dispatch, post) {
  return fetch(`/blogs/${post.slug}.md`)
    .then(response => response.text())
    .then(post => converter.makeHtml(post))
    .then(__html => dispatch({type: GET_POST_SUCCESS, __html, meta: post}))
    .catch(error => dispatch({type: GET_POST_FAILURE, error}))
}

export function getPosts(range) {
  return (dispatch, getState) => {
    dispatch({type: GET_POSTS_REQUEST})
    const data = getState().postdata.slice(range[0], range[1])
    if (!data.length) return Promise.reject(dispatch({type: GET_POSTS_FAILURE}))
    let promise = Promise.resolve()
    data.forEach(post => {
      promise = promise.then(() => {
        return fetchPost(dispatch, post)
      })
    })
    promise
      .then(() => dispatch({type: GET_POSTS_SUCCESS}))
      .catch(error => dispatch({type: GET_POSTS_FAILURE, error}))
  }
}

export function getPost(slug) {
  return (dispatch, getState) => {
    dispatch({type: GET_POST_REQUEST})
    const data = getState().postdata.filter(post => post.slug == slug)
    if (!data.length) return Promise.reject(dispatch({type: GET_POST_FAILURE}))
    return fetchPost(dispatch, data[0])
  }
}
