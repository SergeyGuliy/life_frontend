import { axiosWithAuth } from "../axios";

const API_getById = (userId) => axiosWithAuth.get(`api/users/${userId}`);

export { API_getById };
