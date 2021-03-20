"use strict";
import store from "../store/index";

import axios from "axios";
// import { api } from "../assets/helpers/api";
// import { myVue } from "../main";

let config = {
  baseURL: "http://localhost:3000/"
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store.dispatch("auth/refreshToken");
      if (store.state.user.user) {
        return _axios(originalRequest);
      }
    } else if (error.response.status === 401) {
      await store.dispatch("auth/logOut");
    } else {
      return Promise.reject(error);
    }
  }
);

export default _axios;
