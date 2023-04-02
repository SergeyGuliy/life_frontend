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

    fetchUserById(userId) {},

    getUserById(user) {
      if (typeof user === "number") {
        this.getUserById(user);
      } else if (typeof user === "object") {
        this.setUser(user);
      }
      return this.users[user.userId];
    },

    IsUserExistsAndNeedToUpdate(userId, callback) {
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

// export default {
//   namespaced: true,
//   state: {
//     users: {},
//     rooms: {}
//   },
//   mutations: {
//     setUser(state, userData) {
//       IsUserExistsAndNeedToUpdate(userData.userId, () => {
//         Vue.set(state.users, userData.userId, {
//           ...userData,
//           serverTime: new Date()
//         });
//       });
//     },
//     getUserById(state, userId) {
//       IsUserExistsAndNeedToUpdate(userId, () => fetchUserData(userId));
//     }
//   }
// };
