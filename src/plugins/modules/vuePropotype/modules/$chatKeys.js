import { MESSAGE_RECEIVER_TYPES } from "../../../../utils/enums";
const { PRIVATE } = MESSAGE_RECEIVER_TYPES;

export const $chatKeys = {
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
