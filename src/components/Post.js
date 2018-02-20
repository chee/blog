import React, {PureComponent} from 'react'
import {Link} from 'react-router'

import Time from './Time'

export default class Post extends PureComponent {
  render () {
    const {
      date,
      titleLink,
      title,
      html,
      slug
    } = this.props

    const __html = titleLink
      ? html.replace(/.*\n/, '')
      : html

    return (
      <article>
        <Time date={date} />
        {titleLink &&
          <h1>
            <Link
              to={`/posts/${slug}`}>
              {title}
            </Link>
          </h1>
        }
        <div dangerouslySetInnerHTML={{__html}} />
        &lt;3
      </article>
    )
  }
}
