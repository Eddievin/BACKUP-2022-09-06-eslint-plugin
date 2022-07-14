const { eslint } = require("@skylib/config/api");

const consistentImport = eslint.rules["@skylib/consistent-import/project"];

module.exports = {
  rules: {
    "@skylib/consistent-import/project": [
      "warn",
      {
        sources: [
          {
            _id: "utils",
            autoImport: true,
            autoImportSource: "./utils",
            source: "@skylib/eslint-plugin/src/rules/utils",
            type: "wildcard"
          },
          ...consistentImport.sources
        ]
      }
    ]
  },
  overrides: [
    {
      files: "./src/rules/*",
      rules: {
        // eslint-disable-next-line @skylib/custom/eslintrc-no-disable -- Ok
        "@skylib/primary-export-only": "off",
        "@skylib/sort-keys": [
          "warn",
          {
            overrides: [
              {
                _id: "utils-createRule",
                customOrder: [
                  "name",
                  "fixable",
                  "vue",
                  "isOptions",
                  "defaultOptions",
                  "isSubOptions",
                  "defaultSubOptions",
                  "subOptionsKey",
                  "messages",
                  "create"
                ],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression"
              }
            ]
          }
        ],
        "@skylib/statements-order": [
          "warn",
          {
            rootOrder: [
              "ImportDeclaration",
              "GlobalModuleDeclaration",
              "ExportAllDeclaration",
              "ExportDeclaration",
              "ExportDefaultDeclaration",
              "ExportTypeDeclaration",
              "ExportFunctionDeclaration",
              "ExportModuleDeclaration",
              "ExportUnknown",
              "Unknown",
              "TypeDeclaration",
              "FunctionDeclaration",
              "ModuleDeclaration",
              "JestTest"
            ]
          }
        ]
      }
    },
    {
      files: "./tests/**",
      rules: {
        "@skylib/sort-keys": [
          "warn",
          {
            overrides: [
              {
                _id: "utils-testRule",
                customOrder: [
                  "only",
                  "name",
                  "filename",
                  "settings",
                  "options",
                  "code",
                  "output",
                  "errors"
                ],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression"
              },
              {
                _id: "utils-testRule-errors",
                customOrder: ["line", "endLine", "messageId"],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression > Property[key.name=errors] > ArrayExpression > ObjectExpression"
              }
            ]
          }
        ]
      }
    }
  ]
};
