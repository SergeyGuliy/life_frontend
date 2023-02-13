import { axiosWithoutAuth } from "../axios";
import {
  clearLocalStorageKeys,
  setLocalStorageKeys,
} from "../../localStorageKeys";

const API_login = async (body) => {
  let data = await axiosWithoutAuth.post("api/auth/login", body);
  setLocalStorageKeys(data);
  return data;
};

const API_registration = async (body) => {
  let data = await axiosWithoutAuth.post("api/auth/registration", body);
  setLocalStorageKeys(data);
  return data;
};

const API_refreshToken = async () => {
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");

  if (userId && refreshToken) {
    const data = await axiosWithoutAuth.post("api/auth/refresh-token", {
      userId,
      refreshToken,
    });
    setLocalStorageKeys(data);
    return data;
  } else {
    clearLocalStorageKeys();
    return new Promise((res, rej) => rej("failed"));
  }
};

export { API_login, API_registration, API_refreshToken };
