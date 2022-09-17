import fetch from "auth/FetchInterceptor";

const AuthService = {};
const _url = "auth";

AuthService.login = (data) => {
  return fetch({
    url: `${_url}/login`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};


AuthService.signUp = (data) => {
  return fetch({
    url: `${_url}/create`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

AuthService.user = (params) => {
  return fetch({
    url:`/user`,
    method: "get",
    params,
  });
};

AuthService.getQuotes = (params) => {
  return fetch({
    url:`/qoutes`,
    method: "get",
    params,
  });
};


export default AuthService;
