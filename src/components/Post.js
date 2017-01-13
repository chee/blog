import React from 'react'
import {Link} from 'react-router'

import Time from './Time'

const Post = ({post}) => (
	<article>
		<Time date={post.date}/>
		{ post.titleLink && (post.html = post.html.replace(/.*\n/, '')) &&
			<h1>
				<Link to={`/post/${post.slug}`}>{post.title}</Link>
			</h1>
		}
		<div dangerouslySetInnerHTML={{__html: post.html}}/>
	</article>
)

export default Post
