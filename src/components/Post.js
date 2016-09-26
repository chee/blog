import React from 'react'
import { Link } from 'react-router'

import Time from './Time'

const Post = ({ post }) => (
	<article className="post">
		<Time date={post.meta.date}/>
		{ post.titleLink && (post.__html = post.__html.replace(/.*\n/, '')) &&
			<h1 className="post-title">
				<Link className="post-title-link" to={`/post/${post.meta.slug}`}>{post.meta.title}</Link>
			</h1>
		}
		<div dangerouslySetInnerHTML={post}/>
	</article>
)

export default Post
