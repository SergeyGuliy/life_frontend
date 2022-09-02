const path = require("path");

const getPath = pathUrl => path.resolve(__dirname, pathUrl);

const alias = {
  "@constants": getPath("node_modules/life_shared/constants"),
  "@enums": getPath("node_modules/life_shared/enums")
};

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "0.0.0.0",
    port: 8080
  },
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    resolve: {
      alias
    }
  }
};
