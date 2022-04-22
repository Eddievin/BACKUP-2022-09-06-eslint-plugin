module.exports = {
  consistentImport: [
    { sourcePattern: "estree", type: "wildcard" },
    {
      localName: "ts",
      sourcePattern: "typescript",
      type: "wildcard"
    },
    { sourcePattern: "tsutils", type: "wildcard" },
    {
      autoImportSource: "./utils",
      sourcePattern: "@skylib/eslint-plugin/src/rules/utils",
      type: "wildcard"
    },
    {
      autoImportSource: "./core",
      localName: "utils",
      sourcePattern: "@skylib/eslint-plugin/src/rules/utils/core",
      type: "wildcard"
    }
  ],
  extends: ["@skylib/functions/configs/eslintrc.options"],
  utility: true
};
