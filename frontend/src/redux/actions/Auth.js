import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SET_USER_DATA,
} from "../constants/Auth";

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user,
  };
};

export const authenticated = (data) => {
  return {
    type: AUTHENTICATED,
    payload: data ? data : null,
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};

export const saveUserData = (data) => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};
