import React, {Component} from 'react'
import {connect} from 'react-redux'

import Post from '../components/Post'

import {
  fetchPostList,
  fetchPost
} from '../actions'

class PostPage extends Component {
  static fetchData ({store, params}) {
    const {
      dispatch
    } = store

    // TODO: organise the reducers so that these can happen in parallel
    return dispatch(fetchPostList()).then(() =>
      dispatch(fetchPost(params.slug))
    )
  }

  componentDidMount () {
    const {
      params,
      fetchPostList,
      fetchPost
    } = this.props

    fetchPostList().then(() =>
      fetchPost(params.slug)
    )
  }

  render () {
    const {
      posts,
      params: {
        slug
      },
      unpublishedShown
    } = this.props

    const post = posts.find(post => post.slug === slug)

    if (!post) return null

    const {
      published
    } = post

    const shouldShow = unpublishedShown || published

    if (!shouldShow) return null

    return (
      <main>
        <Post
          {...post}
        />
      </main>
    )
  }
}

function mapStateToProps (state) {
  const {
    posts,
    preferences: {
      unpublishedShown
    }
  } = state

  return {
    posts,
    unpublishedShown
  }
}

const mapDispatchToProps = {fetchPost, fetchPostList}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
