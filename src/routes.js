import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Application from './containers/Application'
import Home from './components/Home'
import PostAlone from './components/PostAlone'
import Posts from './components/Posts'

export default (
	<Route path="/" component={Application}>
		<IndexRoute component={Home}/>
		<Route path="posts" component={Posts}/>
		<Route path="post/:slug" component={PostAlone}/>
	</Route>
)
