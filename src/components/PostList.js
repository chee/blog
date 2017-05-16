import React from 'react'
import {Link} from 'react-router'

import Time from './Time'

const PostList = ({posts}) => (
  <div>
    {
    posts.map((post, index) => (
      <div key={index}>
        <Link to={`/post/${post.slug}`}>
          <span>{post.title} - </span> <Time date={post.date} />
        </Link>
      </div>
    ))
  }
  </div>
)

export default PostList
