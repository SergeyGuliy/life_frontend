import { defineConfig } from "vite";
import vuetify from "vite-plugin-vuetify";
import vue from "@vitejs/plugin-vue";

import path from "path";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const getPath = (pathUrl) => path.resolve(__dirname, pathUrl);
export default defineConfig({
  plugins: [vue(), vuetify()],
  server: {
    port: 8080,
    host: true,
  },
  resolve: {
    alias: {
      "@lib_constants": getPath("node_modules/life_shared/esm/constants"),
      "@lib_enums": getPath("node_modules/life_shared/esm/enums"),

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

      "@constants": getPath("src/assets/js/constants"),
      "@enums": getPath("src/assets/js/enums"),
      "@utils": getPath("src/assets/js/utils"),
    },
  },
});
