import React from 'react'

import Post from './Post'

const Home = ({posts}) => {
  if (!posts.length) {
    return (
      <div>
        <div>loading...</div>
      </div>
    )
  }

  return (
    <div>
      {posts.map(post => {
        if (!post.fetched) return null

        return (
          <Post
            {...post}
            key={post.slug}
            titleLink
          />
        )
      })}
    </div>
  )
}


export default Home
