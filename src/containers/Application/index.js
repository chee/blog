import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'

import './Application.css'
import { getPostdata, getPost, getPosts } from '../../actions'
import Header from '../../components/Header'

class Application extends Component {
	componentDidMount() {
		this.props.dispatch(getPostdata())
	}
	render() {
		const { ...props, children, dispatch } = this.props
		return (
			<div className="application">
				<Header/>
				{ children && cloneElement(children, {
					...props,
					getPost: slug => dispatch(getPostdata()).then(() => dispatch(getPost(slug))),
					getPosts: range => dispatch(getPostdata()).then(() => dispatch(getPosts(range)))
				}) }
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { postdata, posts } = state
	return { postdata, posts }
}

export default connect(mapStateToProps)(Application)
