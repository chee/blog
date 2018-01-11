import React, {PureComponent} from 'react'
import {Link} from 'react-router'

const range = length =>
  Array.apply(0, {length}).map(eval.call, Number)

export default class Pagination extends PureComponent {
  render () {
    const {
      pageSize,
      count,
      currentPage
    } = this.props

    const length = Math.ceil(count / pageSize)

    return (
      <div>
        {range(length).map(page =>
          <Link
            key={page}
            to={`/page/${page}`}>
            {page}
            {currentPage && '*'}
            {' '}
          </Link>
        )}
      </div>
    )
  }
}
