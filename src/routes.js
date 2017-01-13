import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Layout from './components/Layout'
import Home from './components/Home'
import PostAlone from './components/PostAlone'
import Posts from './components/Posts'

export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home}/>
		<Route path="posts" component={Posts}/>
		<Route path="post/:slug" component={PostAlone}/>
	</Route>
)
