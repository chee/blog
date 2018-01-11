import 'dotenv/config'

import Express from 'express'
import React from 'react'
import {Provider} from 'react-redux'
import {match, RouterContext} from 'react-router'

import routes from '../routes'
import createStore from './store'
import {renderToString} from 'react-dom/server'

import fs from 'fs'
import path from 'path'

const buildDir = `${__dirname}/../../build`
const assetsFile = `${buildDir}/asset-manifest.json`

let assets = require(assetsFile)
fs.watch(buildDir, (type, name) => {
  delete require.cache[require.resolve(assetsFile)]
  try {
    console.log('reloading assets file')
    assets = require(assetsFile)
  } catch (error) {
    console.log('couldnt load assetsFile', error)
  }
})

const app = new Express()
const port = process.env.PORT || 5555

app.use(Express.static(buildDir))

function fetchData ({renderProps, store}) {
  const {params, components, location, routes} = renderProps
  const component = components[components.length - 1]
  const wrappedComponent = component.WrappedComponent
  return wrappedComponent && wrappedComponent.fetchData
    ? component.fetchData({
      route: routes[routes.length - 1],
      location,
      params,
      store
    })
    : Promise.resolve()
}

function renderWithData ({store, renderProps, response}) {
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  )
  const state = store.getState()
  response.send(renderFullPage({html, state}))
}

app.get('*', (request, response) => {
  const store = createStore()
  match({routes, location: request.url}, (error, redirectLocation, renderProps) => {
    if (error) return response.status(500).send(error.message)
    if (redirectLocation) return response.redirect(302, redirectLocation.pathname + redirectLocation.search)
    if (renderProps) {
      fetchData({renderProps, store}).then(() =>
        renderWithData({store, renderProps, response})
      )
    } else {
      response
        .status(404)
        .sendFile('404.html', {
          root: path.resolve(__dirname, '../../public')
        })
    }
  })
})

function renderFullPage ({html, state}) {
  return `
  <!doctype html>
  <html lang="en">
  <script>
    window.__state = ${JSON.stringify(state).replace(/<\/script/g, '&lt;/script')}
  </script>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="/${assets['main.css']}">
  <!--
        <![CDATA[
                             ## #
                 # # #      #########
                ### ##### ###      ###
               ##       ###         ###
               ##       ##           ###
                ##                   ###
                 ###     ilu         ##
                   ##        <3    ###
                    ###           ##
                      ##  ur    ##
                       ##  sexy##
                         ##    #
                          #   ##
                           ####
                           ###
                            ##
        ]]>
  -->
  <div id="root" role="main">${html}</div>
  <script src="/${assets['main.js']}"></script>
  `
}

app.listen(port)

console.log(`
  now listening on:
    http://localhost:${port}
`)
