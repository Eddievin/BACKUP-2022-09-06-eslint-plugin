const config = require("@skylib/config/src/eslintrc");

const consistentImport = config.rules["@skylib/consistent-import"];

module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  rules: {
    "@skylib/consistent-import": [
      consistentImport[0],
      {
        ...consistentImport[1],
        sources: [
          ...consistentImport[1].sources,
          {
            sourcePattern: "@skylib/eslint-plugin/src/rules/utils",
            type: "wildcard"
          }
        ]
      }
    ]
  }
};
