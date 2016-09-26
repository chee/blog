import React from 'react'
import { Link } from 'react-router'

const Header = (props) => (
	<header className="header">
		<Link to="/" className="header-link">
			<h1>blog</h1>
		</Link>
	</header>
)

export default Header
