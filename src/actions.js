import 'isomorphic-fetch'
import md from './md'

function createAction (type) {
  function actionCreator (payload) {
    return {
      type,
      payload
    }
  }

  actionCreator.actionType = type

  return actionCreator
}

const fetchPostListRequest = createAction('fetch post list request')
const fetchPostListSuccess = createAction('fetch post list success')
const fetchPostListFailure = createAction('fetch post list failure')

const root = process.env.REACT_APP_DOCUMENT_ROOT || ''

if (!root) {
  console.error('🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 ')
  console.warn('no REACT_APP_DOCUMENT_ROOT environment variable supplied')
  console.warn('server side rendering will fail')
  console.info('check .env file!')
    console.error('🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 ')
}

export function fetchPostList () {
  return (dispatch, getState) => {
    const {
      posts: cachedPosts
    } = getState()

    const success = posts => dispatch(fetchPostListSuccess(posts))
    const failure = error => dispatch(fetchPostListFailure(error))

    if (cachedPosts.length) {
      return Promise.resolve(cachedPosts)
    }

    dispatch(fetchPostListRequest())

    const posts = fetch(`${root}/posts.json`)
      .then(response => response.json())
      .then(posts => posts.reverse())

    posts
      .then(success)
      .catch(failure)

    return posts
  }
}

fetchPostList.request = fetchPostListRequest.actionType
fetchPostList.success = fetchPostListSuccess.actionType
fetchPostList.failure = fetchPostListFailure.actionType

const fetchPostRequest = createAction('fetch post request')
const fetchPostSuccess = createAction('fetch post success')
const fetchPostFailure = createAction('fetch post failure')

export function fetchPost (slug) {
  return (dispatch, getState) => {
    dispatch(fetchPostRequest(slug))

    const {
      posts: cachedPosts
    } = getState()

    const success = payload => dispatch(fetchPostSuccess(payload))
    const failure = error => dispatch(fetchPostFailure(error))

    const cachedPost = cachedPosts.find(post => slug === post.slug)

    if (cachedPost && cachedPost.fetched) {
      return Promise.resolve(success(cachedPost))
    }

    const post = fetch(`${root}/posts/${slug}.md`)
      .then(response => response.text())
      .then(post => ({
        md: post,
        html: md.render(post),
        slug
      }))

    return post
      .then(success)
      .catch(failure)
  }
}

fetchPost.request = fetchPostRequest.actionType
fetchPost.success = fetchPostSuccess.actionType
fetchPost.failure = fetchPostFailure.actionType

export const toggleUnpublished = createAction('toggle unpublished')
