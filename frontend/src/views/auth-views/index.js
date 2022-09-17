import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "components/Loading";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";

const Login = lazy(() => import(`./authentication/login`));
const SignUp = lazy(() => import(`./authentication/signup`));

const AuthViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Routes>
        <Route path="/register" element={<SignUp title="Create an account" />} />
        <Route
          path="/login"
          element={<Login title="Login to your account" />}
        />
        <Route
          path="/"
          element={<Navigate to={`${AUTH_PREFIX_PATH}/login`} />}
        />
      </Routes>
    </Suspense>
  );
};

export default AuthViews;
