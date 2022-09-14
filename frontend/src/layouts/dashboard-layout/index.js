import React from 'react'
import { Routes, Route, } from "react-router-dom";
import DashboardViews from 'views/dashboard-views';
import HeaderNav from "components/HeaderNav";

export const BoardingLayout = () => {
	return (
		<div className="dashboard-container">
			<HeaderNav />
			<Routes className="mt-5">
				<Route path="/*" element={<DashboardViews/>} />
			</Routes>
		</div>
	)
}


export default BoardingLayout
