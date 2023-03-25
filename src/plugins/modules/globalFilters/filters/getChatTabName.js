import { MESSAGE_RECEIVER_TYPES } from "@enums";
import { useStoreChats } from "@stores";
import { getUserName } from "./getUserName";
import { i18n } from "../../globalContext/modules/i18n";

const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;

export const getChatTabName = (chatTab) => {
  const { chats } = useStoreChats();

  const { t } = i18n.global;

  if (chats[chatTab].key === GLOBAL) {
    return t(`enums.${GLOBAL}`);
  } else if (chats[chatTab].key === ROOM) {
    return t(`enums.${ROOM}`);
  } else if (chats[chatTab].key === PRIVATE) {
    return getUserName(chats[chatTab].userData);
  }
};
