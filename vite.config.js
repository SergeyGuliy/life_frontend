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
  resolve: {
    alias: {
      // vue: getPath("node_modules/@vue/compat"),
      "@constants": getPath("node_modules/life_shared/esm/constants"),
      "@enums": getPath("node_modules/life_shared/esm/enums"),

      "@components": getPath("src/components/"),
      "@composable": getPath("src/composable"),
      "@utils": getPath("src/utils"),
      "@stores": getPath("src/stores"),
      "@plugins": getPath("src/plugins"),
      "@mixins": getPath("src/mixins"),
      "@main": getPath("src/main.js"),
      "@api": getPath("src/utils/api/modules"),
    },
  },
});
