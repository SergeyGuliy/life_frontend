import Vue from "vue";
import { MessageReceiverTypes } from "../../assets/helpers/enums";
const { PRIVATE } = MessageReceiverTypes;
import store from "../../store/index";

Vue.prototype.$chat = {
  getUserChatKey(userData) {
    return `${PRIVATE}_${userData.userId}`;
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
    return store.dispatch("dictionaries/updateUserData", userData)
  }
};
