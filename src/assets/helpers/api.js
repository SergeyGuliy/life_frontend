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
  friendship: {
    getYourFriends: () => axios.get("api/friendship/friends"),
    getYourConnections: () => axios.get("api/friendship/requests"),
    sendRequest: receiverId => axios.post(`api/friendship/add/${receiverId}`),
    acceptRequest: receiverId =>
      axios.put(`api/friendship/accept/${receiverId}`),
    ignoreRequest: receiverId =>
      axios.put(`api/friendship/ignore/${receiverId}`),
    deleteFromFriends: receiverId =>
      axios.delete(`api/friendship/delete/${receiverId}`)
  },
  users: {
    getAllUsers: () => axios.get("api/users"),
    getById: userId => axios.get(`api/users/${userId}`)
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
  },
  uploader: {
    uploadVoice: async formData =>
      axios.post(`api/uploader/uploadVoice`, formData),
    getVoice: async voiceMessageId =>
      axios.post(`api/uploader/${voiceMessageId}`)
  }
};
