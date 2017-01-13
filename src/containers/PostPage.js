import React, {Component} from 'react'
import {connect} from 'react-redux'

import Post from '../components/Post'

import {
	fetchPostList,
	fetchPost
} from '../actions'

class PostPage extends Component {
	fetchData({store, params}) {
		// TODO: organise the reducers so that these can happen in parallel
		return store.dispatch(fetchPostList()).then(() => store.dispatch(fetchPost(params.slug)))
	}
	componentDidMount() {
		const {dispatch, params} = this.props
		dispatch(fetchPostList()).then(() => dispatch(fetchPost(params.slug)))
	}

	render() {
		const {posts, params} = this.props
		const post = posts.filter(({slug}) => slug == params.slug)[0]
		return post ? <Post post={post}/> : null
	}
}

function mapStateToProps({posts}) {
	return {
		posts
	}
}

export default connect(mapStateToProps)(PostPage)
