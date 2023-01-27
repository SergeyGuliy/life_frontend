import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import path from "path";
const getPath = (pathUrl) => path.resolve(__dirname, pathUrl);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@constants": getPath("node_modules/life_shared/constants"),
      "@enums": getPath("node_modules/life_shared/enums"),
      "@components": getPath("src/components/"),
      "@composable": getPath("src/composable"),
      "@utils": getPath("src/utils"),
      "@store": getPath("src/store"),
      "@plugins": getPath("src/plugins"),
      "@mixins": getPath("src/mixins"),
      "@api": getPath("src/utils/api"),
      "@main": getPath("src/main.js"),
    },
  },
});
