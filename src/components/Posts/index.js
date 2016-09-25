import React from 'react'
import { Link } from 'react-router'

import './Posts.css'

function links(postdata) {
	return postdata.map((post, index) => (
		<div key={index} className="posts-link-block">
			<Link className="posts-link" to={`/post/${post.slug}`}>
				<span className="posts-link-title">{post.title}</span>
				<time className="posts-link-date" dateTime={(new Date(post.date)).toISOString().replace(/...\..*/, '').replace('T', ' ')}>{(new Date(post.date)).toDateString().toLowerCase()}</time>
			</Link>
		</div>
	))
}

const Posts = ({ postdata }) => (
	<div className="post-links">{ links(postdata) }</div>
)

export default Posts
