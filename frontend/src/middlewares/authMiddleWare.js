import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";

const AuthMiddleWare = (props) => {
  let location = useLocation();


  const {
    isAuthenticated,
  } = props;

  return (
    <>
      {
        isAuthenticated ?
        <>
          <Outlet />
        </>
       :
        <Navigate
          to={{
            pathname: AUTH_PREFIX_PATH,
            state: { from: location },
          }}
        />
      }
    </>
  );
};

export default AuthMiddleWare;
