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
      autoImportSource: "@/rules/utils",
      sourcePattern: "@skylib/eslint-plugin/src/rules/utils",
      type: "wildcard"
    }
  ],
  extends: [
    require("@skylib/functions/src/configs/eslintrc.options")(
      "@skylib/functions/dist/"
    )
  ],
  utility: true
};
