import {installPinnia} from "./modules/pinia";
import {vuetify} from "../vuetify";
import {i18n} from "../i18n";
import {router} from "../../../router";
import {installNotify} from "./modules/notify";


const plugins = [
  vuetify,
  i18n,
  router,
]


export function installGlobalContext(vue) {

  plugins.forEach(plugin => {
    vue.use(plugin)
  })

  installPinnia(vue)
  installNotify(vue)
}
