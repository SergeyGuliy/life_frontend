"use strict";
import store from "../../store";

import axios from "axios";
import { clearLocalStorageKeys } from "../../utils/localStorageKeys";
// import { api } from "../assets/utils/api";
// import { myVue } from "@main";

let config = {
  baseURL: "http://localhost:3000/"
};

const axiosWithAuth = axios.create(config);
const axiosWithoutAuth = axios.create(config);

axiosWithAuth.interceptors.request.use(
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

axiosWithAuth.interceptors.response.use(
  function(response) {
    return response.data;
  },
  async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store.dispatch("auth/refreshToken");
      if (store.state.user.user) {
        return axiosWithAuth(originalRequest);
      }
    } else if (error.response.status === 401) {
      await store.dispatch("auth/logOut");
      clearLocalStorageKeys();
    } else {
      return Promise.reject(error);
    }
  }
);

axiosWithoutAuth.interceptors.response.use(
  function(response) {
    return response.data;
  },
  async function(error) {
    return error;
  }
);
export default {
  axiosWithAuth,
  axiosWithoutAuth
};
