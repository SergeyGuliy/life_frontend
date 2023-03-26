// import { store } from "../../store";

import axios from "axios";
import { clearLocalStorageKeys } from "@utils/localStorageKeys";
import { useAuth } from "@composable";
// import { index } from "../assets/utils/index";
// import { myVue } from "@main";

let config = {
  baseURL: "http://localhost:3000/",
};

const axiosWithAuth = axios.create(config);
const axiosWithoutAuth = axios.create(config);

axiosWithAuth.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosWithAuth.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const { refreshToken, logOut } = useAuth();

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();

      return axiosWithAuth(originalRequest);
    } else if (error.response.status === 401) {
      await logOut();
    } else {
      return Promise.reject(error);
    }
  }
);

axiosWithoutAuth.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    return error;
  }
);

export { axiosWithAuth, axiosWithoutAuth };
