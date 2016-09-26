import React from 'react'
import { Link } from 'react-router'

import Post from './Post'
import Footer from './Footer'

function makePosts(postdata, posts) {
  return postdata.slice(0, 10).map(({ slug }, index) => {
    const post = {...posts[slug]}
    post.title = (
      <h1 className="post-title">
        <Link className="post-title-link" to={`/post/${slug}`}>{post.meta.title}</Link>
      </h1>
    )
    post.__html = post.__html.replace(/.*\n/, '')
    return <Post post={post} key={index}/>
  })
}

class Home extends React.Component {
  componentWillMount() {
    const { getPosts } = this.props
    getPosts([0, 10])
  }

  render() {
    const { posts, postdata } = this.props

    if (postdata.length <= Object.keys(posts).length) {
      return (
        <div className="home">
          { makePosts(postdata, posts) }
          <Footer/>
        </div>
      )
    }
    return (
      <div>
        loading posts...
        <Footer/>
      </div>
    )
  }
}

export default Home
