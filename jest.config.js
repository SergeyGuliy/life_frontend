module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/tests/unit/index.js"],
  moduleNameMapper: {
    "/^@/(.*)$/": "<rootDir>/$1"
  },
  testMatch: ["<rootDir>/**/*.spec.js", "<rootDir>/**/*.test.js"],
  resolver: null
};
