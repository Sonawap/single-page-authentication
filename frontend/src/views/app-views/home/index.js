import { useDocumentTitle } from 'hooks/useDocumentTitle';
import React from 'react'

const Home = (props) => {
	const {title} = props;
	useDocumentTitle(title);
	return (
		<div>
			Home component works!
		</div>
	)
}

export default Home
