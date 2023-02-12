import { defineStore } from "pinia";

import {
  clearLocalStorageKeys,
  setLocalStorageKeys,
} from "../utils/localStorageKeys";
import { API_leaveRoom } from "@api/rooms";

export const useStoreAuth = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  getters: {
    userIsDarkTheme: (state) => state.user.userSettings.isDarkTheme,
  },

  actions: {
    setUser({ userData, accessToken, refreshToken }) {
      setLocalStorageKeys({ accessToken, refreshToken, userData });
      this.user = userData;
    },
    cleanUser() {
      this.$reset();
    },
    adminRoom(roomId) {
      this.user.roomCreatedId = roomId;
    },
    joinRoom(roomId) {
      this.user.roomJoinedId = roomId;
    },
    leaveRoom() {
      this.user.roomJoinedId = null;
    },
    setProfileSettings(settings) {
      this.user = {
        ...this.user,
        ...settings,
      };
    },
    setUserSettings(settings) {
      this.user.userSettings = {
        ...this.user.userSettings,
        ...settings,
      };
    },

    setRoomId(roomId) {
      this.user.roomCreatedId = roomId;
    },

    async updateUserSettings({ profileSettings, userSettings }) {
      if (profileSettings) {
        this.setProfileSettings(profileSettings);
      }
      if (userSettings) {
        this.setUserSettings(userSettings);
      }
    },
    async leaveRoomAction() {
      let { roomJoinedId } = await API_leaveRoom();
      if (!roomJoinedId) {
        this.leaveRoom();
      }
    },
  },
});
