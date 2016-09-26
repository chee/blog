import React from 'react'
import { Link } from 'react-router'

import Time from './Time'

function links(postdata) {
  return postdata.map((post, index) => (
    <div key={index} className="posts-link-block">
      <Link className="posts-link" to={`/post/${post.slug}`}>
        <span className="posts-link-title">{post.title} - </span>
        <Time date={post.date}/>
      </Link>
    </div>
  ))
}

const Posts = ({ postdata }) => (
  <div className="post-links">{ links(postdata) }</div>
)

export default Posts
