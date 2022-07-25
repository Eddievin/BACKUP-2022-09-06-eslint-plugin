// eslint-disable-next-line @skylib/disallow-import/no-internal-modules -- Wait for @skylib/config update
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
        "@skylib/match-filename/project/createRule": [
          "warn",
          {
            format: "camelCase",
            selector:
              "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=createRule] > Identifier.id"
          }
        ],
        "@skylib/match-filename/project/createRule-name": [
          "warn",
          {
            format: "kebabCase",
            selector:
              "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=createRule] > CallExpression > ObjectExpression > Property[key.name=name] > Literal.value"
          }
        ],
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
      files: "./src/wrapped-rules/*",
      rules: {
        "@skylib/disallow-import/no-relative-parent-imports": [
          "warn",
          {
            disallow: [
              "../**",
              "../../**",
              "../../../**",
              "../../../../**",
              "../../../../../**"
            ],
            allow: ["../rules/*"]
          }
        ],
        "@skylib/match-filename/project/wrapRule": [
          "warn",
          {
            format: "camelCase",
            selector:
              "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=wrapRule] > Identifier.id"
          }
        ],
        // eslint-disable-next-line @skylib/custom/eslintrc-no-disable -- Ok
        "@skylib/primary-export-only": "off"
      }
    },
    {
      files: "./tests/**",
      rules: {
        "@skylib/custom/project/no-ast": [
          "warn",
          {
            message: "Prefer string literal",
            selector: "Identifier[name=AST_NODE_TYPES]"
          }
        ],
        "@skylib/match-filename/project/testRule-name": [
          "warn",
          {
            format: "kebabCase",
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=testRule] > Literal:first-child"
          }
        ],
        "@skylib/match-filename/project/testRule-rule": [
          "warn",
          {
            format: "camelCase",
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=testRule] > Identifier:nth-child(2)"
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
