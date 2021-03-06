import axios from "axios";

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.response &&
      err.response.request.responseURL.indexOf(`/login`) === -1 &&
      err.response.status === 403) {
      onLoginFail();
      return Promise.reject(false);
    } else if (err.response && err.response.status === 403) {
      return Promise.reject(null);
    }
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
