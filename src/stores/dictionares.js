import { defineStore } from "pinia";
import { getUserById } from "../helpers";

export const useStoreDictionaries = defineStore("dictionaries", {
  state: () => ({
    users: {},
  }),
  actions: {
    setUser(userData) {
      this.users[userData.userId] = userData;
    },

    fetchUserById(userId) {},

    getUserById(user) {
      if (typeof user === "number") {
        this.getUserById(user);
      } else if (typeof user === "object") {
        this.setUser(user);
      }
      return this.users[user.userId];
    },
  },
});

const requestUsersOrders = [];
const UPDATE_TIME_DELTA = 100000;

function IsUserExistsAndNeedToUpdate(userId, callback) {
  const userNotExists = !store.state.dictionaries.users[userId];

  if (userNotExists) return callback();

  const { serverTime } = store.state.dictionaries.users[userId];
  const needToUpdate = Math.abs(serverTime - new Date()) > UPDATE_TIME_DELTA;

  if (needToUpdate) callback();
}

function fetchUserData(userId) {
  if (requestUsersOrders.includes(userId)) return;

  requestUsersOrders.push(userId);
  API_getById(userId)
    .then((userData) => {
      if (userData) store.commit("dictionaries/setUser", userData);
    })
    .finally(() => {
      const userIdToDelete = requestUsersOrders.findIndex((i) => i === userId);
      requestUsersOrders.splice(userIdToDelete, 1);
    });
}
