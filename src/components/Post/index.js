import React from 'react'
import { Link } from 'react-router'

import './Post.css'

class Post extends React.Component {
  componentWillMount() {
    const { posts, getPost, params: { slug } } = this.props
    if (posts[slug]) return
    getPost(slug)
  }

  render() {
    const { posts, params: { slug } } = this.props
    if (posts[slug]) {
      return (
        <div>
          <article className="post">
            <div dangerouslySetInnerHTML={posts[slug]}/>
              — chee
          </article>
          <div className="post-footer">
            <Link to="/posts">other posts</Link>
          </div>
        </div>
      )
    }
    return (
      <div>
        loading post...
        <div className="post-footer">
          <Link className="post-footer-link" to="/posts">other posts</Link>
        </div>
      </div>
    )
  }
}

export default Post
