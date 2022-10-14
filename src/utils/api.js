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
      axiosWithAuth.post("api/users-settings/change-password", formData),

    changeLocale: async formData =>
      axiosWithAuth.post("api/users-settings/change-locale", formData),

    changeTheme: async formData =>
      axiosWithAuth.post("api/users-settings/change-theme", formData),

    updateUserSettings: async formData =>
      axiosWithAuth.post("api/users-settings/update-settings", formData)
  },
  friendship: {
    getYourFriends: () => axiosWithAuth.get("api/friendships/friends"),

    getYourConnections: () => axiosWithAuth.get("api/friendships/requests"),

    sendRequest: receiverId =>
      axiosWithAuth.post(`api/friendships/${receiverId}/add`),

    acceptRequest: receiverId =>
      axiosWithAuth.put(`api/friendships/${receiverId}/accept`),

    ignoreRequest: receiverId =>
      axiosWithAuth.put(`api/friendships/${receiverId}/ignore`),

    deleteFromFriends: receiverId =>
      axiosWithAuth.delete(`api/friendships/${receiverId}/delete`)
  },
  users: {
    getById: userId => axiosWithAuth.get(`api/users/${userId}`)
  },
  rooms: {
    getRooms: async params => axiosWithAuth.get("api/rooms/", { params }),

    getRoomById: async roomId => axiosWithAuth.get(`api/rooms/${roomId}`),

    create: async formData => axiosWithAuth.post("api/rooms/create", formData),

    leaveRoom: async () => axiosWithAuth.patch("api/rooms/leave"),

    joinRoom: async (roomId, roomPassword = "") =>
      axiosWithAuth.patch(`api/rooms/${roomId}/join`, { roomPassword }),

    kickUserFromRoom: async (roomId, kickUserId) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/kick-user`, { kickUserId }),

    setNewRoomAdmin: async (roomId, newAdminId) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/set-new-admin`, { newAdminId }),

    toggleLockRoom: async (roomId, formData) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/toggle-lock-room`, formData),

    deleteRoom: async roomId =>
      axiosWithAuth.delete(`api/rooms/${roomId}/delete-room`)
  },
  games: {
    startGame: async (roomId, gameData) =>
      axiosWithAuth.post(`api/games/create`, { roomId, gameData })
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
      axiosWithAuth.post(`api/uploader/images/avatars`, formData)
  }
};
