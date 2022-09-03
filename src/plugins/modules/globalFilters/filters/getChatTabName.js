import { myVue } from "@main";
import { MESSAGE_RECEIVER_TYPES } from "@enums";
const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;

export const getChatTabName = chatTab => {
  if (myVue.$chats[chatTab].key === GLOBAL) {
    return myVue.$t(`enums.${GLOBAL}`);
  } else if (myVue.$chats[chatTab].key === ROOM) {
    return myVue.$t(`enums.${ROOM}`);
  } else if (myVue.$chats[chatTab].key === PRIVATE) {
    return myVue.$filters.getUserName(myVue.$chats[chatTab].userData);
  }
};
