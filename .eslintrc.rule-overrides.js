const { eslint } = require("@skylib/config/api");

const consistentImport = eslint.rules["@skylib/consistent-import"];

module.exports = {
  rules: {
    "@skylib/consistent-import": [
      "warn",
      {
        sources: [
          ...consistentImport.sources,
          {
            _id: "utils",
            autoImport: true,
            autoImportSource: "@/utils",
            source: "@skylib/eslint-plugin/src/utils",
            wildcard: true
          }
        ]
      }
    ],
    "@skylib/disallow-import": [
      "warn",
      { disallow: ["{natural-compare,tsutils,typescript}"] }
    ]
  },
  overrides: [
    {
      files: ["./src/misc/core/*", "./src/typescript/core/*"],
      rules: {
        "@skylib/match-filename/createRule": [
          "warn",
          {
            format: "camelCase",
            selector:
              "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=createRule] > Identifier.id"
          }
        ],
        "@skylib/match-filename/createRule-name": [
          "warn",
          {
            format: "kebab-case",
            selector:
              "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=createRule] > CallExpression > ObjectExpression > Property[key.name=name] > Literal.value"
          }
        ],
        "@skylib/no-relative-parent-import": [
          "warn",
          {
            allow: [
              "../../../misc",
              "../../../utils",
              "../../misc",
              "../../utils",
              "../misc",
              "../utils"
            ],
            disallow: [
              "../**",
              "../../**",
              "../../../**",
              "../../../../**",
              "../../../../../**"
            ]
          }
        ],
        // eslint-disable-next-line @skylib/config/eslintrc-no-disable -- Postponed
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
        "@skylib/sort-statements": [
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
      files: "./src/**",
      rules: {
        "@skylib/match-filename/wrapRule": [
          "warn",
          {
            format: "camelCase",
            selector:
              "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=wrapRule] > Identifier.id"
          }
        ],
        "@skylib/no-relative-parent-import": [
          "warn",
          {
            allow: [
              "../../../misc",
              "../../../typescript",
              "../../../utils",
              "../../misc",
              "../../typescript",
              "../../utils",
              "../misc",
              "../typescript",
              "../utils"
            ],
            disallow: [
              "../**",
              "../../**",
              "../../../**",
              "../../../../**",
              "../../../../../**"
            ]
          }
        ],
        // eslint-disable-next-line @skylib/config/eslintrc-no-disable -- Postponed
        "@skylib/primary-export-only": "off"
      }
    },
    {
      files: "./tests/**",
      rules: {
        "@skylib/match-filename/testRule-name": [
          "warn",
          {
            format: "kebab-case",
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=testRule] > Literal:first-child"
          }
        ],
        "@skylib/match-filename/testRule-rule": [
          "off",
          {
            format: "kebab-case",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ],
        "@skylib/no-restricted-syntax/no-ast": [
          "warn",
          {
            message: "Prefer string literal",
            selector: "Identifier[name=AST_NODE_TYPES]"
          }
        ],
        "@skylib/no-restricted-syntax/no-test-only": [
          "warn",
          {
            message: "No skipped tests",
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression > Property > Identifier.key[name=only]"
          }
        ],
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
