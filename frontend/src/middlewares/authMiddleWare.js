import React, { useEffect, useState } from "react";
import {
  Navigate,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";
import Loading from "components/Loading";
import AuthService from "services/AuthService";
import { connect } from "react-redux";
import {
  saveUserData,
  signOut,
} from "redux/actions/Auth";

const AuthMiddleWare = (props) => {
  let location = useLocation();
  let navigate = useNavigate();

  const {
    saveUserData,
    signOut
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    AuthService.user()
      .then((response) => {
        saveUserData(response?.user);
      })
      .catch(() => {
        signOut();
        navigate(`${AUTH_PREFIX_PATH}/login`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const {
    isAuthenticated,
  } = props;

  return (
     <>
      {isLoading === true ? (
        <Loading cover="page" />
      ) : (
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
      )}
    </>
  );
};

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser};
};

const mapDispatchToProps = {
  saveUserData,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthMiddleWare);

