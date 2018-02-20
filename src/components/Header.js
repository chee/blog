import React from 'react'
import {Link} from 'react-router'

const Header = () => (
  <header>
    <Link
      onClick={event => event.stopPropagation()}
      to='/'>
      <h2>
        blog
      </h2>
    </Link>
  </header>
)

export default Header
