import React from "react";
import { Routes, Route } from "react-router-dom";
import AppViews from "views/app-views";
import HeaderNav from "components/HeaderNav";

export const AppLayout = () => {
  return (
    <div className="app-container">
      <HeaderNav />
      <Routes>
        <Route path="/*" element={<AppViews />} />
      </Routes>
    </div>
  );
};

export default AppLayout;
