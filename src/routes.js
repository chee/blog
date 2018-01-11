import React from 'react'

import {
  Redirect,
  Route,
  IndexRoute
} from 'react-router'

import Layout from './components/Layout'
import HomePage from './containers/HomePage'
import PostListPage from './containers/PostListPage'
import PostPage from './containers/PostPage'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={HomePage} />
    <Redirect from='page/0' to='/' />
    <Route path='page/:page' component={HomePage} />
    <Route path='posts' component={PostListPage} />
    <Route path='posts/:slug' component={PostPage} />
  </Route>
)
