import { chatDate } from "./filters/chatDate";
import { avatarLink } from "./filters/avatarLink";
import { voiceLink } from "./filters/voiceLink";
import { getUserName } from "./filters/getUserName";
import { getChatTabName } from "./filters/getChatTabName";
import { dictGetUserById } from "./filters/dictGetUserById";
import { gameDate } from "./filters/gameDate";

const filters = {
  chatDate,
  avatarLink,
  voiceLink,
  getUserName,
  getChatTabName,
  dictGetUserById,
  gameDate,
};

export function installGlobalFilters(vue) {
  vue.config.globalProperties.$filters = filters;
}
