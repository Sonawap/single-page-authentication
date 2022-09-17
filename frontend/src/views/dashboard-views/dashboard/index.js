import { Alert, Button } from 'antd';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import React, { useState } from 'react'
import { connect } from "react-redux";
import AuthService from 'services/AuthService';

const Dashboard = (props) => {
	const {title, authUser} = props;
	useDocumentTitle(title);

	const [isLoading, setIsLoading] = useState(false);
	const [quotes, setQuotes] = useState(null);
	const [error, setErrors] = useState(null);

	const handleQuoteButton = () => {
		setIsLoading(true);
		AuthService.getQuotes()
			.then((response) => {
				setQuotes(response?.quotes);
			})
			.catch((error) => {
				setErrors(error?.data?.message);
			}).finally(() => {
				setIsLoading(false);
			})
	}

	return (
		<div className='dashboard-body-container'>
			<h3>Welcome to your account</h3>
			<h3>Name: {authUser?.name}</h3>
			<h3>Password: {authUser?.email}</h3>
			<Button className='quote-button' onClick={handleQuoteButton} loading={isLoading}>Get Quotes</Button>

			{
				quotes ? (
					quotes?.map((quote, i) => (
						<li key={i}>{quote}</li>
					))
				) : 
				(
					<div>No Quote Avaliable</div>
				)
			}
			{error &&
				<Alert
					type="error"
					showIcon
					message={error}
				></Alert>
			}
		</div>

	)
}

const mapStateToProps = ({auth}) => {
	const { authUser } = auth;
	return {authUser}
}

export default connect(mapStateToProps)(Dashboard)
