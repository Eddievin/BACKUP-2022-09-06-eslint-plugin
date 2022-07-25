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
            autoImportSource: "@/utils",
            source: "@skylib/eslint-plugin/src/utils",
            type: "wildcard"
          },
          ...consistentImport.sources
        ]
      }
    ],
    "@skylib/disallow-import/project": [
      "warn",
      { disallow: ["{natural-compare,tsutils,typescript}"] }
    ]
  },
  overrides: [
    {
      files: ["./src/misc/core/*", "./src/typescript/core/*"],
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
            allow: ["../../utils", "../misc", "../utils"]
          }
        ],
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
      files: "./src/**",
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
            allow: [
              "../../misc",
              "../../typescript",
              "../../utils",
              "../misc",
              "../utils",
              "../typescript"
            ]
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
        "@skylib/custom/project/no-test-only": [
          "warn",
          {
            message: "No skipped tests",
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression > Property > Identifier.key[name=only]"
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
          "off",
          {
            format: "kebabCase",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
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
