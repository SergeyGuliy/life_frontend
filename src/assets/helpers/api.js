import axios from "../../plugins/modules/axios";

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
    leaveRoom: async () => axios.patch("api/rooms/leave"),
    joinRoom: async (roomId, roomPassword) =>
      axios.patch(`api/rooms/join/${roomId}`, {
        roomPassword: roomPassword || ""
      })
  },
  chats: {
    getGlobalMessages: async () => axios.get("api/chats/global"),
    getRoomMessages: async () => axios.get(`api/chats/room`),
    getPrivateMessages: async () => axios.get(`api/chats/private`)
  }
};
