import React from 'react'
import { Routes, Route, } from "react-router-dom";
import AuthViews from 'views/auth-views';
import HeaderNav from "components/HeaderNav";

export const AuthLayout = () => {
	return (
		<div className="auth-container">
			<HeaderNav />
			<div className='auth-wrapper'>
				<Routes>
					<Route path="/*" element={<AuthViews />} />
				</Routes>
			</div>
		</div>
	)
}


export default AuthLayout
