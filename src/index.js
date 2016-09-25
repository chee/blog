import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import * as reducers from './reducers'

import './normalize.css'

import Application from './containers/Application'
import Home from './components/Home'
import Post from './components/Post'
import Posts from './components/Posts'

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  routerMiddleware(browserHistory))(createStore)

const store = createStoreWithMiddleware(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }), window.devToolsExtension && window.devToolsExtension()
)

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={Application}>
        <IndexRoute component={Home}/>
        <Route path="posts" component={Posts}/>
        <Route path="post/:slug" component={Post}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
