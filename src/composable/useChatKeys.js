import { MESSAGE_RECEIVER_TYPES } from "@enums";

const { PRIVATE } = MESSAGE_RECEIVER_TYPES;

export function useChatKeys() {
  const getUserChatKey = (user) =>
    typeof user === "number"
      ? `${PRIVATE}_${user}`
      : `${PRIVATE}_${user.userId}`;

  const getUserIdFromChatKey = (chatKey) => chatKey.split("_")[1];

  const getTypeFromChatKey = (chatKey) => chatKey.split("_")[0];

  return {
    getUserChatKey,
    getUserIdFromChatKey,
    getTypeFromChatKey,
  };
}
