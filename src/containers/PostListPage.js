import React, {Component} from 'react'
import {connect} from 'react-redux'

import PostList from '../components/PostList'

import {fetchPostList} from '../actions'

class PostListPage extends Component {
	static fetchData({store}) {
		return store.dispatch(fetchPostList())
	}
	componentDidMount() {
		const {dispatch} = this.props
		dispatch(fetchPostList())
	}

	render() {
		return <PostList posts={this.props.posts}/>
	}
}

function mapStateToProps({posts}) {
	return {
		posts
	}
}

export default connect(mapStateToProps)(PostListPage)
