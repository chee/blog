import React from 'react'
import { Link } from 'react-router'

const Post = ({ post }) => (
  <article className="post">
    <time className="post-date" dateTime={(new Date(post.meta.date)).toISOString().replace(/...\..*/, '').replace('T', ' ')}>{(new Date(post.meta.date)).toDateString().toLowerCase()}</time>
    { post.title &&
      <h1 className="post-title">
        <Link className="post-title-link" to={`/post/${post.meta.slug}`}>{post.meta.title}</Link>
      </h1>
    }
    <div dangerouslySetInnerHTML={post}/>
  </article>
)

export default Post
