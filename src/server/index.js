import Express from 'express'
import React from 'react'
import {Provider} from 'react-redux'
import {match, RouterContext} from 'react-router'

import routes from '../routes'
import createStore from './store'
import {renderToString} from 'react-dom/server'

const app = new Express
const port = process.env.PORT || 5555

app.use(Express.static(`${__dirname}/../../build`))

app.get('*', (request, response) => {
	const store = createStore()
	match({routes, location: request.url}, (error, redirectLocation, renderProps) => {
		if (error) return response.status(500).send(error.message)
		if (redirectLocation) return response.redirect(302, redirectLocation.pathname + redirectLocation.search)
		if (renderProps) {
			function fetchData() {
				const {params, components, location, routes} = renderProps
				const component = components[components.length - 1]
				const wrappedComponent = component.WrappedComponent
				return wrappedComponent && wrappedComponent.fetchData
				? component.fetchData({route: routes[routes.length - 1], location, params, store})
				: Promise.resolve()
			}
			fetchData().then(() => {
				const html = renderFullPage(renderToString(
					<Provider store={store}>
						<RouterContext {...renderProps}/>
					</Provider>
				), store.getState())
				response.send(html)
			})
		} else {
			const html = renderToString(<div>lol oh no</div>)
			response.status(404)
			return response.send(renderFullPage(html, {}))
		}
	})
})

function renderFullPage(html, state) {
	return `
	<!doctype html>
	<html lang="en">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--
				<![CDATA[
														 ## #
								 # # #			#########
								### ##### ###			###
							 ##			 ###				 ###
							 ##			 ##					 ###
								##									 ###
								 ###		 ilu				 ##
									 ##				<3		###
										###					 ##
											##	ur		##
											 ##	sexy##
												 ##		#
													#	 ##
													 ####
													 ###
														##
				]]>
	-->
	<title>title blogs</title>
	<script>
		window.__state = ${JSON.stringify(state)}
	</script>
	<div id="root" role="main">hello ${html}</div>
	<script src="/static/js/main.js"></script>
	`
}

app.listen(port)

console.log(`now listening on http://localhost:${port}`)
