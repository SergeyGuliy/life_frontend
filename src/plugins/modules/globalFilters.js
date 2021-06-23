import Vue from "vue";
import moment from "moment";
import store from "../../store";
import { myVue } from "../../main";
import { MESSAGE_RECEIVER_TYPES } from "../../utils/enums";
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;

Vue.filter("chatDate", function(value) {
  let date = moment(value);
  return date.format("YYYY-MM-DD HH:mm");
});

Vue.filter("avatarLink", function(avatarId) {
  if (avatarId) {
    return `http://localhost:3000/api/uploader/images/avatars/${avatarId}`;
  } else {
    return "";
  }
});

Vue.filter("voiceLink", function(avatarId) {
  if (avatarId) {
    return `http://localhost:3000/api/uploader/voiceMessages/${avatarId}`;
  } else {
    return "";
  }
});

Vue.filter("getUserName", function(userData) {
  const { firstName, lastName, email } = userData;
  if (firstName || lastName) {
    return `${firstName || ""} ${lastName || ""}`;
  }
  return email;
});

Vue.filter("getChatTabName", function(chatTab) {
  if (myVue.$chats[chatTab].key === GLOBAL) {
    return myVue.$t(`enums.${GLOBAL}`);
  } else if (myVue.$chats[chatTab].key === ROOM) {
    return myVue.$t(`enums.${ROOM}`);
  } else if (myVue.$chats[chatTab].key === PRIVATE) {
    return myVue.$filters.getUserName(myVue.$chats[chatTab].userData);
  }
});

Vue.filter("dictionariesGetUserById", function(user) {
  if (typeof user === "number") {
    store.dispatch("dictionaries/getUserById", user);
  } else if (typeof user === "object") {
    store.dispatch("dictionaries/updateUserData", user);
  }
  return store.state.dictionaries.users[user];
});
