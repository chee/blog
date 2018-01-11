import {
  fetchPostList,
  fetchPost,
  toggleUnpublished
} from './actions'

export function posts (state = [], action) {
  switch (action.type) {
    case fetchPostList.success: {
      return [
        ...state,
        ...action.payload
      ]
    }
    case fetchPost.success: {
      const {
        slug,
        html,
        md
      } = action.payload
      const posts = state.map(post => {
        if (post.slug !== slug) return post

        return {
          ...post,
          html,
          md,
          fetched: true
        }
      })
      return posts
    }
    default:
      return state
  }
}

function getInitialPreferences () {
  return {
    unpublishedShown: false
  }
}

export function preferences (state = getInitialPreferences(), action) {
  switch (action.type) {
    case toggleUnpublished.actionType: {
      return {
        ...state,
        unpublishedShown: !state.unpublishedShown
      }
    }
    default:
      return state
  }
}
