import React from 'react'
import { Link } from 'react-router'

const Header = (props) => (
  <div className="header">
    <Link to="/" className="header-link">
      <h2>blog</h2>
    </Link>
  </div>
)

export default Header
