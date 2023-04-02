import { defineStore } from "pinia";
import { API_getById } from "@api";

let requestUsersOrders = [];
const UPDATE_TIME_DELTA = 100000;

export const useStoreDictionaries = defineStore("dictionaries", {
  state: () => ({
    users: {},
  }),
  actions: {
    setUser(userData) {
      this.users[userData.userId] = { ...userData, serverTime: new Date() };
    },

    getUserById(user) {
      if (typeof user === "number") {
        this.isUserExistsAndNeedToUpdate(user, () => this.fetchUserData(user));
      } else if (typeof user === "object") {
        this.isUserExistsAndNeedToUpdate(user.userId, () => this.setUser(user));
      }
      return this.users[user.userId];
    },

    isUserExistsAndNeedToUpdate(userId, callback) {
      const userNotExists = !this.users[userId];
      if (userNotExists) return callback();

      const needToUpdate =
        Math.abs(this.users[userId].serverTime - new Date()) >
        UPDATE_TIME_DELTA;
      if (needToUpdate) callback();
    },

    fetchUserData(userId) {
      if (requestUsersOrders.includes(userId)) return;

      requestUsersOrders.push(userId);

      API_getById(userId)
        .then(this.setUser)
        .finally(() => {
          requestUsersOrders = requestUsersOrders.filter((i) => i !== userId);
        });
    },
  },
});
