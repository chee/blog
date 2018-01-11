#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const {promisify} = require('util')
const {createInterface} = require('readline')

const generateJson = require('../lib/generateJson')

const publicdir = path.resolve(__dirname, '../public')
const postsdotjson = path.resolve(publicdir, 'posts.json')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const json = readFile(postsdotjson)
  .then(data => JSON.parse(data))

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = string => new Promise(resolve => rl.question(string, resolve))

json
  .then(json => json.map(post => {
    const {
      published = true
    } = post

    if (published) {
      return Promise.resolve(post)
    }

    return question(`should i publish "${post.title}"? [Y/n]`)
      .then(answer =>
        answer
          .toLowerCase()
          .startsWith('n')
            ? post
            : {...post, published: true}
      )
  }))
  .then(promises => Promise.all(promises))
  .then(json => writeFile(postsdotjson, generateJson(json)))
  .then(() => rl.close())
