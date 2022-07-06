module.exports = {
  overrides: [
    {
      files: "src/rules/utils/synonyms.ts",
      extends: [
        require.resolve("@skylib/config/src/eslintrc.allow-nodejs-modules"),
        require.resolve("@skylib/config/src/eslintrc.allow-unsafe-require")
      ]
    }
  ]
};
