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
  },
  rooms: {
    create: async roomData => axios.post("api/rooms/create", roomData),
    getById: async roomId => axios.get(`api/rooms/${roomId}`),
    getRooms: async params => axios.get("api/rooms/", { params }),
    leaveRoom: async () => axios.patch("api/rooms/leave")
  }
};
