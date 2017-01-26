import React, {Component} from 'react'
import {connect} from 'react-redux'

import Home from '../components/Home'

import {
	fetchPostList,
	fetchPost
} from '../actions'

class HomePage extends Component {
	static fetchData({store, params}) {
		return store.dispatch(fetchPostList()).then(({posts}) => {
			posts.forEach(post => store.dispatch(fetchPost(post.slug)))
		})
	}
	componentDidMount() {
		const {dispatch} = this.props
		dispatch(fetchPostList()).then(({posts}) => {
			posts.forEach(post => dispatch(fetchPost(post.slug)))
		})
	}

	render() {
		const {posts} = this.props
		return <Home posts={posts}/>
	}
}

function mapStateToProps({posts}) {
	return {
		posts: posts.slice(0, 10)
	}
}

export default connect(mapStateToProps)(HomePage)
