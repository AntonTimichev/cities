import axios from 'axios';

import {ActionCreator} from "./reducer/user/user.js";
import ModelOffer from "./model-offer.js";

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => ModelOffer.parseToOffers(response.data);
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
      return;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

// export const createAPI = (onLoginFail) => {
//   const api = axios.create({
//     baseURL: `https://es31-server.appspot.com/six-cities`,
//     timeout: 1000 * 5,
//     withCredentials: true,
//   });
//
//   const onSuccess = (response) => response;
//   const onFail = (err) => {
//     if (err.response.request.responseURL.indexOf(`/login`) === -1 && err.response.status === 403) {
//       onLoginFail();
//       return;
//     }
//
//     throw err;
//   };
//
//   api.interceptors.response.use(onSuccess, onFail);
//
//   return api;
// };
