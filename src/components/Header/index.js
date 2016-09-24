import React from 'react'
import { Link } from 'react-router'
import './Header.css'

const Header = (props) => (
  <div className="header">
    <Link to="/"><h2><span className="header-url">snaek.org/blog</span> <em>everything at once</em></h2></Link>
  </div>
)

export default Header
