import Vue from "vue";
import { chatDate } from "./filters/chatDate";
import { avatarLink } from "./filters/avatarLink";
import { voiceLink } from "./filters/voiceLink";
import { getUserName } from "./filters/getUserName";
import { getChatTabName } from "./filters/getChatTabName";
import { dictionariesGetUserById } from "./filters/dictionariesGetUserById";

Vue.filter("chatDate", chatDate);

Vue.filter("avatarLink", avatarLink);

Vue.filter("voiceLink", voiceLink);

Vue.filter("getUserName", getUserName);

Vue.filter("getChatTabName", getChatTabName);

Vue.filter("dictionariesGetUserById", dictionariesGetUserById);
