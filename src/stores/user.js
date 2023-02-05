import { defineStore } from "pinia";

import {
  clearLocalStorageKeys,
  setLocalStorageKeys,
} from "../utils/localStorageKeys";
import { api } from "../utils/api";

export const useStoreAuth = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  getters: {
    userIsDarkTheme: (state) => user.userSettings.isDarkTheme,
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
      let { roomJoinedId } = await api.rooms.leaveRoom();
      if (!roomJoinedId) {
        this.leaveRoom();
      }
    },

    async refreshToken() {
      const userId = localStorage.getItem("userId");
      const refreshToken = localStorage.getItem("refreshToken");
      if (userId && refreshToken) {
        try {
          const data = await api.auth.refreshToken({
            userId,
            refreshToken,
          });
          await this.setUserData(data);
        } catch (e) {
          await this.logOut();
          clearLocalStorageKeys();
        }
      } else {
        clearLocalStorageKeys();
      }
    },
  },
});
