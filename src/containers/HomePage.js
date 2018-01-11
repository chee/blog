import React, {PureComponent} from 'react'

import {
  connect
} from 'react-redux'

import Home from '../components/Home'
import Pagination from '../components/Pagination'

import {
  fetchPostList,
  fetchPost
} from '../actions'

const PAGE_SIZE = 3

const checkIsPublished = post => {
  const {
    published
  } = post

  return published
}

class HomePage extends PureComponent {
  static fetchData ({store, params}) {
    const {
      page = 0
    } = params

    const topPostIndex = page * PAGE_SIZE

    return store.dispatch(fetchPostList()).then(() => {
      const {
        posts
      } = store.getState()

      const shownPosts = posts.filter(checkIsPublished)

      const topPost = posts[topPostIndex]

      const post = checkIsPublished(topPost)
        ? topPost
        : shownPosts.slice(topPostIndex).find(checkIsPublished)

      const firstPost = shownPosts[0]

      const slug = post
        ? post.slug
        : firstPost && firstPost.slug

      return store.dispatch(fetchPost(slug))
    })
  }

  filterPosts = posts => {
    // TODO memoize posts
    const {
      params: {page = 0},
      unpublishedShown
    } = this.props

    if (!posts) return null

    const start = page * PAGE_SIZE
    const end = start + PAGE_SIZE

    return posts
      .slice(start, end)
      .filter(post => {
        return unpublishedShown || post.published
      })
  }

  fetchPosts = prevProps => {
    const {
      fetchPostList,
      fetchPost,
      params: {page},
      unpublishedShown
    } = this.props

    const unpublishedUnchanged =
      prevProps &&
      unpublishedShown === prevProps.unpublishedShown

    const pageUnchanged =
      prevProps &&
        page === prevProps.params.page

    const pageIsNull =
      prevProps &&
        page == null && prevProps.params.page == null

    if (unpublishedUnchanged && pageUnchanged) return

    if (unpublishedUnchanged && pageIsNull) return

    const map = fn => list => list.map(fn)

    const pluckSlug = post => post.slug

    const pluckSlugs = map(pluckSlug)

    const fetchPosts = map(fetchPost)

    fetchPostList()
      .then(this.filterPosts)
      .then(pluckSlugs)
      .then(fetchPosts)
  }

  componentDidMount () {
    this.fetchPosts()
  }

  componentDidUpdate (prevProps) {
    this.fetchPosts(prevProps)
  }

  render () {
    const {
      params: {page = 0},
      posts
    } = this.props

    return (
      <main>
        <Home
          posts={this.filterPosts(posts)}
        />
        <Pagination
          pageSize={PAGE_SIZE}
          count={posts.length}
          currentPage={page}
        />
      </main>
    )
  }
}

function mapStateToProps (state) {
  const {
    posts,
    preferences
  } = state

  return {
    posts,
    unpublishedShown: preferences.unpublishedShown
  }
}

const mapDispatchToProps = {
  fetchPost,
  fetchPostList
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
