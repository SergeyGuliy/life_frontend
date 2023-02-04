import {pinia} from "../../../store";
import {vuetify} from "../vuetify";
import {i18n} from "../i18n";
import {router} from "../../../router";
import {installNotify} from "./modules/notify";


const plugins = [
  pinia,
  vuetify,
  i18n,
  router,
]


export function installGlobalContext(vue) {

  plugins.forEach(plugin => {
    vue.use(plugin)
  })

  installNotify(vue)
}
