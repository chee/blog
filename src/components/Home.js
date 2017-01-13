import React from 'react'

import Post from './Post'

const Home = ({posts}) => (
	<div>
		{
			posts.length
			? posts.map(post => post.fetched ? <Post key={post.slug} post={{...post, titleLink: true}}/> : null)
			: <div>loading...</div>
		}
	</div>
)

export default Home
