module.exports = {
  extends: require.resolve("@skylib/config/src/eslintrc.allow-nodejs-modules"),
  overrides: [
    {
      files: "src/rules/utils/synonyms.ts",
      extends: [
        require.resolve("@skylib/config/src/eslintrc.allow-require"),
        require.resolve("@skylib/config/src/eslintrc.allow-require-unsafe")
      ]
    }
  ]
};
