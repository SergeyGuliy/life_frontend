import Vue from "vue";
import { chatDate } from "./filters/chatDate";
import { avatarLink } from "./filters/avatarLink";
import { voiceLink } from "./filters/voiceLink";
import { getUserName } from "./filters/getUserName";
import { getChatTabName } from "./filters/getChatTabName";
import { dictGetUserById } from "./filters/dictGetUserById";
import { mathRound } from "./filters/math";

Vue.filter("chatDate", chatDate);

Vue.filter("avatarLink", avatarLink);

Vue.filter("voiceLink", voiceLink);

Vue.filter("getUserName", getUserName);

Vue.filter("getChatTabName", getChatTabName);

Vue.filter("dictGetUserById", dictGetUserById);

Vue.filter("mathRound", mathRound);
