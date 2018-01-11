import React, {Component} from 'react'

import {connect} from 'react-redux'

import PostList from '../components/PostList'

import {fetchPostList} from '../actions'

class PostListPage extends Component {
  static fetchData ({store}) {
    return store.dispatch(fetchPostList())
  }

  componentDidMount () {
    const {
      fetchPostList
    } = this.props

    fetchPostList()
  }

  render () {
    const {
      posts,
      unpublishedShown
    } = this.props

    return (
      <main>
        <PostList
          posts={posts}
          unpublishedShown={unpublishedShown}
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

const mapDispatchToProps = {
  fetchPostList
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage)
