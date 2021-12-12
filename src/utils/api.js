import axios from "../plugins/modules/axios";
const { axiosWithAuth, axiosWithoutAuth } = axios;
export const api = {
  auth: {
    login: async body => axiosWithoutAuth.post("api/auth/login", body),

    registration: async body =>
      axiosWithoutAuth.post("api/auth/registration", body),

    refreshToken: async formData =>
      axiosWithoutAuth.post("api/auth/refresh-token", formData)
  },
  userSettings: {
    changePassword: async formData =>
      axiosWithAuth.post("api/auth/change-password", formData),

    changeLocale: async formData =>
      axiosWithAuth.post("api/auth/change-locale", formData),

    changeTheme: async formData =>
      axiosWithAuth.post("api/auth/change-theme", formData),

    updateUserSettings: async formData =>
      axiosWithAuth.post("api/auth/update-settings", formData)
  },
  friendship: {
    getYourFriends: () => axiosWithAuth.get("api/friendship/friends"),

    getYourConnections: () => axiosWithAuth.get("api/friendship/requests"),

    sendRequest: receiverId =>
      axiosWithAuth.post(`api/friendship/${receiverId}/add`),

    acceptRequest: receiverId =>
      axiosWithAuth.put(`api/friendship/${receiverId}/accept`),

    ignoreRequest: receiverId =>
      axiosWithAuth.put(`api/friendship/${receiverId}/ignore`),

    deleteFromFriends: receiverId =>
      axiosWithAuth.delete(`api/friendship/${receiverId}/delete`)
  },
  users: {
    getAllUsers: () => axiosWithAuth.get("api/users"),

    getById: userId => axiosWithAuth.get(`api/users/${userId}`)
  },
  rooms: {
    create: async roomData => axiosWithAuth.post("api/rooms/create", roomData),

    leaveRoom: async () => axiosWithAuth.patch("api/rooms/leave"),

    getRooms: async params => axiosWithAuth.get("api/rooms/", { params }),

    getById: async roomId => axiosWithAuth.get(`api/rooms/${roomId}`),

    joinRoom: async (roomId, roomPassword = "") =>
      axiosWithAuth.patch(`api/rooms/${roomId}/join`, { roomPassword }),

    kickUserFromRoom: async (roomId, kickUserId) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/kick-user`, { kickUserId }),

    setNewRoomAdmin: async (roomId, newAdminId) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/set-new-admin`, { newAdminId }),

    blockRoom: async roomId =>
      axiosWithAuth.patch(`api/rooms/${roomId}/block-room`),

    deleteRoom: async roomId =>
      axiosWithAuth.delete(`api/rooms/${roomId}/delete-room`)
  },
  chats: {
    getGlobalMessages: async () => axiosWithAuth.get("api/chats/global"),

    getRoomMessages: async () => axiosWithAuth.get(`api/chats/room`),

    getPrivateMessages: async () => axiosWithAuth.get(`api/chats/private`)
  },
  uploader: {
    uploadVoice: async formData =>
      axiosWithAuth.post(`api/uploader/uploadVoice`, formData),

    uploadAvatar: async formData =>
      axiosWithAuth.post(`api/uploader/images/avatars`, formData),

    getVoice: async voiceMessageId =>
      axiosWithAuth.post(`api/uploader/${voiceMessageId}`)
  }
};
