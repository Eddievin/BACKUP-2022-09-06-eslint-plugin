module.exports = {
  overrides: [
    {
      extends: [
        require.resolve("@skylib/config/src/eslintrc.allow-nodejs-modules"),
        require.resolve("@skylib/config/src/eslintrc.allow-unsafe-require")
      ],
      files: "src/rules/utils/synonyms.ts"
    }
  ]
};
