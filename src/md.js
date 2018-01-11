import Remarkable from 'remarkable'

const md = new Remarkable('full', {
  html: true,
  linkify: true,
  langPrefix: 'language-'
})

export default md
