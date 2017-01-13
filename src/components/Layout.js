import React from 'react'

import Header from '../components/Header'
import Footer from './Footer'

const Layout = ({children}) => (
	<div>
		<Header/>
			{children}
		<Footer/>
	</div>
)

export default Layout
