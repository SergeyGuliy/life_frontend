const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "0.0.0.0",
    port: 8080
  },
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    resolve: {
      alias: {
        "@constants": path.resolve(
          __dirname,
          "node_modules/life_shared/constants"
        ),
        "@enums": path.resolve(__dirname, "node_modules/life_shared/enums")
      }
    }
  }
};
