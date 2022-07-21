module.exports = {
  extends: [
    require.resolve("@skylib/config/src/eslintrc.allow-nodejs-modules"),
    require.resolve("@skylib/config/src/eslintrc.allow-type-assertions"),
    require.resolve("@skylib/config/src/eslintrc.allow-require"),
    require.resolve("@skylib/config/src/eslintrc.allow-require-unsafe")
  ]
};
