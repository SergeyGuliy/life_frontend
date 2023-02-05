import { axiosWithoutAuth } from "../axios";

const API_login = async (body) => axiosWithoutAuth.post("api/auth/login", body);

const API_registration = async (body) =>
  axiosWithoutAuth.post("api/auth/registration", body);

const API_refreshToken = async (formData) =>
  axiosWithoutAuth.post("api/auth/refresh-token", formData);

export { API_login, API_registration, API_refreshToken };
