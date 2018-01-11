const beautify = require('js-beautify').js_beautify

module.exports = function generateJson (posts) {
  const json = JSON.stringify(posts)

  return beautify(json, {
    indent_size: 2
  })
}
