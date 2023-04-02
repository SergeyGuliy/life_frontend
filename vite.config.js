import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import vuetify from "vite-plugin-vuetify";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import path from "path";
const getPath = (pathUrl) => path.resolve(__dirname, pathUrl);
export default defineConfig({
  plugins: [vue(), vuetify()],
  server: {
    port: 8080,
    host: true,
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  resolve: {
    alias: {
      // "vue-i18n": "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js",

      "@api": getPath("src/api"),
      "@assets": getPath("src/assets"),
      "@components": getPath("src/components"),
      "@composable": getPath("src/composable"),
      "@helpers": getPath("src/helpers"),
      "@layouts": getPath("src/layouts"),
      "@locales": getPath("src/locales"),
      "@plugins": getPath("src/plugins"),
      "@router": getPath("src/router"),
      "@stores": getPath("src/stores"),
      "@utils": getPath("src/utils"),

      "@constants": getPath("node_modules/life_shared/esm/constants"),
      "@enums": getPath("node_modules/life_shared/esm/enums"),
    },
  },
});
