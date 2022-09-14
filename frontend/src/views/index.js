import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthMiddleWare from "middlewares/authMiddleWare";
import GuestMiddleWare from "middlewares/guestMiddleWare";
import Error404 from "./errors/404";
import {
  AUTH_PREFIX_PATH,
  DASHBOARD_PREFIX_PATH,
} from "configs/AppConfig";
import AuthLayout from "layouts/auth-layout";
import DashboardLayout from "layouts/dashboard-layout"

export const Views = (props) => {
  const { token } = props;
  return (
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
      />
      <Route
        element={
          <GuestMiddleWare isAuthenticated={token} />
        }
      >
        <Route
          path={`${AUTH_PREFIX_PATH}/*`}
          element={<AuthLayout />}
        />
      </Route>
      <Route
        element={
          <AuthMiddleWare isAuthenticated={token} />
        }
      >
        <Route
          path={`${DASHBOARD_PREFIX_PATH}/*`}
          element={
            <DashboardLayout />
          }
        />
      </Route>
      <Route path="*" element={<Error404 title="Page not found" />} />
    </Routes>
  );
};

const mapStateToProps = ({ auth }) => {
  const { token  } = auth;
  return { token};
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
