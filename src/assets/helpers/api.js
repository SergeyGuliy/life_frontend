import axios from "../../plugins/axios";

export const api = {
  auth: {
    login: async body => axios.post("api/auth/login", body),
    registration: async body => axios.post("api/auth/registration", body),
    refreshToken: async (userId, refreshToken) =>
      axios.post("api/auth/refresh-token", {
        userId,
        refreshToken
      })
  },
  users: {
    getAllUsers: () => axios.get("api/users")
  }
};
