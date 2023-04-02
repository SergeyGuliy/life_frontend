import { defineStore } from "pinia";
import { API_getById } from "@api";

let requestUsersOrders = [];
const UPDATE_TIME_DELTA = 100000;

const resolver = {
  requests: [],

  addRequest(userId) {
    this.requests.push(userId);
  },
  removeRequest(userId) {
    this.requests = this.requests.filter((i) => i !== userId);
  },

  fetchUser(storeContext, userId) {
    if (requestUsersOrders.includes(userId)) return;
    this.addRequest(userId);

    API_getById(userId)
      .then(storeContext.setUser)
      .finally(this.removeRequest(userId));
  },

  isNeedUpdate(storeContext, userId, callback) {
    const userNotExists = !storeContext.users[userId];
    if (userNotExists) return callback();

    const userServerTime = Math.abs(
      storeContext.users[userId].serverTime - new Date()
    );
    const needToUpdate = userServerTime > UPDATE_TIME_DELTA;
    if (needToUpdate) callback();
  },
};

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
        resolver.isNeedUpdate(this, user, () => resolver.fetchUser(this, user));
      } else if (typeof user === "object") {
        resolver.isNeedUpdate(this, user.userId, () => this.setUser(user));
      }
      return this.users[user.userId];
    },
  },
});
