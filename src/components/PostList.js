import React from 'react'
import {Link} from 'react-router'

import Time from './Time'

const PostList = ({posts, unpublishedShown}) => (
  <div>
    {posts.map((post, index) => {
      const {
        slug,
        title,
        date,
        published
      } = post

      if (!published && !unpublishedShown) return null

      return (
        <div key={index}>
          <Link to={`/posts/${slug}`}>
            <span>
              {title}
            </span>
            {' '}
            <Time date={date} />
          </Link>
        </div>
      )
    })
  }
  </div>
)

export default PostList
