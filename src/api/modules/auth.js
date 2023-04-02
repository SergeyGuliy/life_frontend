import { axiosWithoutAuth } from "@utils/axios";
import { LS_auth, LS_refreshToken, LS_userId } from "@helpers";

const API_login = async (body) => {
  let data = await axiosWithoutAuth.post("api/auth/login", body);
  LS_auth.set(data);
  return data;
};

const API_registration = async (body) => {
  let data = await axiosWithoutAuth.post("api/auth/registration", body);
  LS_auth.set(data);
  return data;
};

const API_refreshToken = async () => {
  const userId = LS_userId.value;
  const refreshToken = LS_refreshToken.value;

  if (userId && refreshToken) {
    const data = await axiosWithoutAuth.post("api/auth/refresh-token", {
      userId,
      refreshToken,
    });
    LS_auth.set(data);
    return data;
  } else {
    LS_auth.clear();
    return new Promise((res, rej) => rej("failed"));
  }
};

export { API_login, API_registration, API_refreshToken };
