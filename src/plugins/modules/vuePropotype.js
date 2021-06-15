import Vue from "vue";
import { MESSAGE_RECEIVER_TYPES } from "../../assets/helpers/enums";
const { PRIVATE } = MESSAGE_RECEIVER_TYPES;
import store from "../../store/index";

Vue.prototype.$chat = {
  getUserChatKey(user) {
    if (typeof user === "number") {
      return `${PRIVATE}_${user}`;
    } else {
      return `${PRIVATE}_${user.userId}`;
    }
  },
  getUserIdFromChatKey(chatKey) {
    return chatKey.split("_")[1];
  },
  getTypeFromChatKey(chatKey) {
    return chatKey.split("_")[0];
  }
};
Vue.prototype.$getUserName = userData => {
  const { firstName, lastName, email } = userData;
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  return email;
};
Vue.prototype.$dictionares = {
  async getUserById(userId) {
    return await store.dispatch("dictionaries/getUserById", userId);
  },
  updateUserData(userData) {
    return store.dispatch("dictionaries/updateUserData", userData);
  },
  async getOrUpdateUser(user) {
    if (typeof user === "number") {
      return await this.getUserById(user);
    } else {
      return await this.updateUserData(user);
    }
  }
};
