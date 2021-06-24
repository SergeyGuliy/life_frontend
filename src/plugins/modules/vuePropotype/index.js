import Vue from "vue";

import { $dictionares } from "./modules/$dictionares";
import { $usersActions } from "./modules/$usersActions";
import { $noti } from "./modules/$noti";
import { $chatKeys } from "./modules/$chatKeys";
import { $openModal } from "./modules/$openModal";
import { $currentUserActions } from "./modules/$currentUserActions";

Vue.prototype.$chatKeys = $chatKeys;

Vue.prototype.$noti = $noti;

Vue.prototype.$usersActions = $usersActions;

Vue.prototype.$dictionares = $dictionares;

Vue.prototype.$currentUserActions = $currentUserActions;

Vue.prototype.$openModal = $openModal;

Vue.prototype.$filters = Vue.options.filters;
