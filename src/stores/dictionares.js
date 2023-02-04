import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  // convert to a function
  state: () => ({
    firstName: "",
  }),
  getters: {
    fullName: (state) => state.firstName,
  },
  actions: {
    updateUser(payload) {
      this.firstName = payload.firstName;
    },
  },
});
