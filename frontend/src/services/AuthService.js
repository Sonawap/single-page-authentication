import fetch from "auth/FetchInterceptor";

const AuthService = {};
const _url = "auth";

AuthService.login = (data) => {
  return fetch({
    url: `${_url}/signin`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

AuthService.checkToken = (data) => {
  return fetch({
    url: `${_url}/check-token`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

AuthService.signUp = (data) => {
  return fetch({
    url: `${_url}/signup`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

AuthService.user = (params) => {
  return fetch({
    url:`${_url}/user`,
    method: "get",
    params,
  });
};


export default AuthService;
