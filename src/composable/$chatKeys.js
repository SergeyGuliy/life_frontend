// import { MESSAGE_RECEIVER_TYPES } from "@enums";
// const { PRIVATE } = MESSAGE_RECEIVER_TYPES;

export function $chatKeys() {
  function getUserChatKey(user) {
    if (typeof user === "number") {
      // return `${PRIVATE}_${user}`;
    } else {
      // return `${PRIVATE}_${user.userId}`;
    }
  }
  function getUserIdFromChatKey(chatKey) {
    return chatKey.split("_")[1];
  }
  function getTypeFromChatKey(chatKey) {
    return chatKey.split("_")[0];
  }
  return {
    getUserChatKey,
    getUserIdFromChatKey,
    getTypeFromChatKey,
  };
}
