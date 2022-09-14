import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from 'components/Loading';

const Dashboard = lazy(() => import(`./dashboard`));
export const DashboardViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <Routes>
        <Route path="/" element={<Dashboard title="Dashboard"/>} />
      </Routes>
    </Suspense>
  )
}

export default DashboardViews;

