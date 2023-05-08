import { defineStore } from "pinia";

import { API_leaveRoom } from "@api";

export const useStoreUser = defineStore("user", {
  state: () => ({
    user: null,
  }),

  getters: {
    userIsDarkTheme: (state) => state.user.userSettings.isDarkTheme,
  },

  actions: {
    setUser({ userData }) {
      this.user = userData;
    },
    cleanUser() {
      this.$reset();
    },
    setAdminRoom(roomId) {
      this.user.roomCreatedId = roomId;
    },
    setJoinedRoom(roomId) {
      this.user.roomJoinedId = roomId;
    },
    leaveRoom() {
      this.user.roomJoinedId = null;
    },
    setProfileSettings(settings) {
      this.user = { ...this.user, ...settings };
    },
    setUserSettings(settings) {
      this.user.userSettings = { ...this.user.userSettings, ...settings };
    },
    setRoomId(roomId) {
      this.user.roomCreatedId = roomId;
    },
    async updateUserSettings({ profileSettings, userSettings }) {
      if (profileSettings) this.setProfileSettings(profileSettings);
      if (userSettings) this.setUserSettings(userSettings);
    },
    async leaveRoomAction() {
      let { roomJoinedId } = await API_leaveRoom();
      if (!roomJoinedId) this.leaveRoom();
    },
  },
});
