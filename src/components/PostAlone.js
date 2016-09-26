import React from 'react'

import Post from './Post'
import Footer from './Footer'

class PostAlone extends React.Component {
	componentWillMount() {
		const { posts, getPost, params: { slug } } = this.props
		if (posts[slug]) return
		getPost(slug)
	}

	render() {
		const { posts, params: { slug } } = this.props
		const post = posts[slug]
		if (!post) return <Footer/>

		return (
			<div>
				<Post post={post}/>
				<Footer/>
			</div>
		)
	}
}

export default PostAlone
