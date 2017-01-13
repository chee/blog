import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Layout from './components/Layout'
import HomePage from './containers/HomePage'
import PostListPage from './containers/PostListPage'
import PostPage from './containers/PostPage'

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={HomePage}/>
		<Route path="posts" component={PostListPage}/>
		<Route path="post/:slug" component={PostPage}/>
	</Route>
)
