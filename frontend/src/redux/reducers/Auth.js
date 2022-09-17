import {
  AUTH_TOKEN,
  AUTHENTICATED,
  SET_USER_DATA,
  SIGNOUT,
  REFRESH_TOKEN,
  REDIRECT_PATH
} from "../constants/Auth";

const initState = {
  authUser: null,
  showMessage: false,
  redirect: "/dashboard",
  token: localStorage.getItem(AUTH_TOKEN)
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: "/dashboard",
        token: action?.payload?.token,
        authUser: action?.payload?.user,
      };
    case SIGNOUT: {
      localStorage.removeItem(AUTH_TOKEN);
      sessionStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(REDIRECT_PATH);
      return {
        ...state,
        token: null,
        authUser: null,
        redirect: "/",
      };
    }
    case SET_USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default:
      return state;
  }
};

export default auth;
