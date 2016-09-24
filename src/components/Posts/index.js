import React from 'react'
import { Link } from 'react-router'

import './Posts.css'

function links(postdata) {
	return postdata.map((post, index) => (
		<div key={index} className="post-link-block">
			<Link className="post-link" to={`/post/${post.slug}`}>
				<span className="post-link-title">{post.title}</span>
				<time className="post-link-date" dateTime="2001-05-15 19:00">{(new Date(post.date)).toDateString().toLowerCase()}</time>
			</Link>
		</div>
	))
}

const Posts = ({ postdata }) => (
	<div className="post-links">{ links(postdata) }</div>
)

export default Posts
