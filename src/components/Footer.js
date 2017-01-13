import React from 'react'
import {Link} from 'react-router'

const Footer = (props) => (
	<footer className="footer">
		<Link to="/posts" className="footer-link">
			other posts
		</Link>
	</footer>
)

export default Footer
