#!/usr/bin/env node
const {createInterface} = require('readline')
const child = require('child_process')
const {promisify} = require('util')
const open = require('opn')

const argv = require('minimist')(process.argv.slice(2))

const fs = require('fs')
const path = require('path')

const writeFile = promisify(fs.writeFile)
const exec = promisify(child.exec)

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const tmp = Math.random().toString(36).slice(2)
const post = path.resolve(__dirname, 'post.js')
const command = [
  post,
  tmp,
  argv.s && '-s',
  argv.o && '-o'
].filter(Boolean).join(' ')

rl.question('what is the title of this "post" ?\n  ', title => {
  writeFile(tmp, `# ${title}\n\n`).then(() => {
    rl.close()
    const filename = exec(command)
      .then(result => result.stdout)

    filename.then(console.log)
  })
})
