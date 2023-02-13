import { installPinia } from "./modules/pinia";
import { installVuetify } from "./modules/vuetify";
import { installI18n } from "./modules/i18n";
import { installRouter } from "./modules/router";

import { installNotify } from "./modules/notify";

export function installGlobalContext(vue) {
  installPinia(vue);
  installRouter(vue);

  installVuetify(vue);
  installI18n(vue);

  installNotify(vue);
}
