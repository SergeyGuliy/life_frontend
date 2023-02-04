import App from "./App.vue";
import { createApp } from "vue";

import {installPlugins} from "./plugins";

let vue = createApp(App)

installPlugins(vue)
