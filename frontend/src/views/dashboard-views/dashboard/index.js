import { useDocumentTitle } from 'hooks/useDocumentTitle';
import React from 'react'

const Dashboard = (props) => {
	const {title} = props;
	useDocumentTitle(title);
	return (
		<div>
			Dashboard component works!
		</div>
	)
}

export default Dashboard
