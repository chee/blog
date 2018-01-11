#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const {promisify} = require('util')

const argv = require('minimist')(process.argv.slice(2))
const open = require('opn')

const generateJson = require('../lib/generateJson')

const file = argv._[0]
const isSecret = argv.s
const shouldOpen = argv.o

const exec = promisify(require('child_process').exec)

const usage = `usage: ${process.argv[1]} <file> [-s]`

if (!file) {
  console.error(usage)
  process.exit(1)
}

function readWriteError (error) {
  console.error(error)
  process.exit(2)
}

const publicdir = path.resolve(__dirname, '../public')
const postsdir = path.resolve(publicdir, 'posts')
const postsdotjson = path.resolve(publicdir, 'posts.json')

const firstLine = exec(`head -1 ${file}`)
  .then(result => result.stdout)
  .catch(readWriteError)

const readFile = promisify(fs.readFile)

const json = readFile(postsdotjson)
  .then(data => JSON.parse(data))
  .catch(readWriteError)

const rename = promisify(fs.rename)

const writeFile = promisify(fs.writeFile)

Promise.all([json, firstLine]).then(([posts, firstLine]) => {
  const title = firstLine.replace(/^#+ +/, '').replace(/\n/, '')

  const slug = title.replace(/[^0-9A-Za-z]+/g, '-').toLowerCase()

  const newfile = `${postsdir}/${slug}.md`

  rename(file, newfile)
    .then(() => {
      console.log(newfile)
      if (shouldOpen) {
        open(newfile, {wait: false})
      }
    })
    .catch(readWriteError)

  const post = posts.find(post => post.slug === slug)

  if (post) return Promise.resolve()

  posts.push({
    date: new Date().toISOString(),
    slug,
    title,
    published: !isSecret
  })

  const json = generateJson(posts)

  return writeFile(postsdotjson, json)
})
