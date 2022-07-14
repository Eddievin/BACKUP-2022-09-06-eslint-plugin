// eslint-disable-next-line @skylib/custom/eslintrc-no-temp  -- Wait for @skylib/config update
module.exports = {
  rules: {
    "@skylib/custom": [
      "warn",
      { selector: "PropertyDefinition[typeAnnotation=undefined]" }
    ],
    "@skylib/disallow-import/no-internal-modules": [
      "off",
      {
        disallow: ["./*/**", "@*/*/**", "[^@]*/**"],
        allow: [
          "./configs/eslintrc.synonyms",
          "./src/eslintrc.synonyms",
          "./src/test-utils",
          "@skylib/*/dist/test-utils",
          "@typescript-eslint/utils/dist/ts-eslint",
          "@vue/test-utils/dist/interfaces/wrapperLike",
          "@vue/test-utils/dist/types",
          "date-fns/locale/*",
          "flag-icon-css/flags/*/*.svg",
          "jest-extended/all",
          "quasar/wrappers",
          "ts-toolbelt/**",
          "typeface-roboto-multilang/*.css"
        ]
      }
    ],
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        custom: { match: true, regex: "^.{1,50}$" },
        format: ["camelCase"],
        leadingUnderscore: "allow",
        selector: "default"
      },
      {
        custom: { match: true, regex: "^.{1,50}$" },
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
        selector: ["classProperty", "function", "typeLike"]
      },
      {
        custom: { match: true, regex: "^.{1,50}$" },
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        selector: "variable"
      },
      {
        custom: { match: true, regex: "^.{1,150}$" },
        // eslint-disable-next-line unicorn/no-null -- Ok
        format: null,
        selector: [
          "objectLiteralMethod",
          "objectLiteralProperty",
          "typeProperty"
        ]
      },
      {
        // eslint-disable-next-line unicorn/no-null -- Ok
        format: null,
        modifiers: ["requiresQuotes"],
        selector: "default"
      }
    ],
    "etc/no-enum": "off"
  }
};
