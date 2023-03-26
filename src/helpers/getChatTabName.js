import { MESSAGE_RECEIVER_TYPES } from "@enums";
import { useStoreChats } from "@stores";
import { getUserName } from "@helpers";
import { useLocale } from "@composable";

const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;

export const getChatTabName = (chatTab) => {
  const { chats } = useStoreChats();
  const { t } = useLocale();

  if (chats[chatTab].key === GLOBAL) {
    return t(`enums.${GLOBAL}`);
  } else if (chats[chatTab].key === ROOM) {
    return t(`enums.${ROOM}`);
  } else if (chats[chatTab].key === PRIVATE) {
    return getUserName(chats[chatTab].userData);
  }
};
