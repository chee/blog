import React from 'react'
import { Link } from 'react-router'

import './Posts.css'

function links(postdata) {
	return postdata.map((post, index) => (
		<div key={index} className="post-link-block">
			<Link className="post-link" to={`/post/${post.slug}`}>
				<span className="post-link-title">{post.title}</span>
				<time className="post-link-date" dateTime={(new Date(post.date)).toISOString().replace(/...\..*/, '').replace('T', ' ')}>{(new Date(post.date)).toDateString().toLowerCase()}</time>
			</Link>
		</div>
	))
}

const Posts = ({ postdata }) => (
	<div className="post-links">{ links(postdata) }</div>
)

export default Posts
