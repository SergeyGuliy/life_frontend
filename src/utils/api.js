import axios from "../plugins/modules/axios";
const { axiosWithAuth, axiosWithoutAuth } = axios;
export const api = {
  auth: {
    login: async body => axiosWithoutAuth.post("api/auth/login", body),
    registration: async body =>
      axiosWithoutAuth.post("api/auth/registration", body),
    refreshToken: async (userId, refreshToken) =>
      axiosWithoutAuth.post("api/auth/refresh-token", {
        userId,
        refreshToken
      })
  },
  userSettings: {
    changePassword: async ({ oldPassword, newPassword }) =>
      axiosWithAuth.post("api/auth/change-password", {
        oldPassword,
        newPassword
      }),
    changeLocale: async locale =>
      axiosWithAuth.post("api/auth/change-locale", { locale }),
    changeTheme: async isDarkTheme =>
      axiosWithAuth.post("api/auth/change-theme", { isDarkTheme }),
    updateUserSettings: async userSettings =>
      axiosWithAuth.post("api/auth/update-settings", userSettings)
  },
  friendship: {
    getYourFriends: () => axiosWithAuth.get("api/friendship/friends"),
    getYourConnections: () => axiosWithAuth.get("api/friendship/requests"),
    sendRequest: receiverId =>
      axiosWithAuth.post(`api/friendship/add/${receiverId}`),
    acceptRequest: receiverId =>
      axiosWithAuth.put(`api/friendship/accept/${receiverId}`),
    ignoreRequest: receiverId =>
      axiosWithAuth.put(`api/friendship/ignore/${receiverId}`),
    deleteFromFriends: receiverId =>
      axiosWithAuth.delete(`api/friendship/delete/${receiverId}`)
  },
  users: {
    getAllUsers: () => axiosWithAuth.get("api/users"),
    getById: userId => axiosWithAuth.get(`api/users/${userId}`)
  },
  rooms: {
    create: async roomData => axiosWithAuth.post("api/rooms/create", roomData),
    getById: async roomId => axiosWithAuth.get(`api/rooms/${roomId}`),
    getRooms: async params => axiosWithAuth.get("api/rooms/", { params }),
    leaveRoom: async () => axiosWithAuth.patch("api/rooms/leave"),
    joinRoom: async (roomId, roomPassword) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/join`, {
        roomPassword: roomPassword || ""
      }),
    kickUserFromRoom: async (roomId, kickUserId) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/kick-user`, {
        kickUserId
      }),
    setNewRoomAdmin: async (roomId, newAdminId) =>
      axiosWithAuth.patch(`api/rooms/${roomId}/set-new-admin`, {
        newAdminId
      }),
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
