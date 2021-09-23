module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/tests/unit/index.js"],
  moduleNameMapper: {
    "/^@/(.*)$/": "<rootDir>/$1"
  },
  resolver: null
};
