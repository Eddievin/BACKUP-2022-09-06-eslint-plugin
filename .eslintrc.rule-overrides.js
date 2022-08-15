/* eslint-disable @skylib/config/eslintrc-no-disable -- Ok */

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
            _id: "rule-templates",
            autoImport: true,
            autoImportSource: "@/rule-templates",
            source: "@skylib/eslint-plugin/src/rule-templates",
            wildcard: true
          },
          {
            _id: "utils",
            autoImport: true,
            autoImportSource: "@/utils",
            source: "@skylib/eslint-plugin/src/utils",
            wildcard: true
          },
          {
            _id: "utils/casing",
            source: "@skylib/eslint-plugin/src/utils/casing",
            wildcard: true
          },
          {
            _id: "utils/configurable-selector",
            source: "@skylib/eslint-plugin/src/utils/configurable-selector",
            wildcard: true
          },
          {
            _id: "utils/types/TSESTree",
            localName: "TSESTree",
            source: "@skylib/eslint-plugin/src/utils/types/TSESTree",
            wildcard: true
          }
        ]
      }
    ],
    "@skylib/disallow-import/natural-compare": [
      "off",
      { disallow: ["natural-compare"] }
    ],
    "@skylib/disallow-import/typescript": [
      "off",
      { disallow: ["{tsutils,typescript}"] }
    ],
    "@skylib/no-sibling-import": [
      "warn",
      {
        folders: [
          {
            filesToLint: ["./*"],
            levels: [["./jest.config"], ["./jest.config.fast"]]
          },
          {
            filesToLint: ["./src/utils/*"],
            levels: [
              ["./TypeCheck", "./compare", "./misc"],
              ["./create-rule", "./create-rule.internal", "./sort", "./test"]
            ]
          },
          {
            filesToLint: ["./src/utils/types/*"],
            levels: [["./misc"], ["./context"]]
          }
        ]
      }
    ],
    "@skylib/require-syntax/fix": [
      // eslint-disable-next-line no-warning-comments -- Wait for @skylib/eslint-plugin update
      // fixme
      "off",
      { selector: "Identifier[name=fix]", trigger: "Identifier[name=fixable]" }
    ]
  },
  overrides: [
    { files: "./fixtures/**", rules: { "@skylib/consistent-filename": "off" } },
    {
      files: "./src/utils/compare.ts",
      rules: { "@skylib/disallow-import/natural-compare": "off" }
    },
    {
      files: [
        "./src/dev/typescript.d.ts",
        "./src/utils/TypeCheck.internal.ts",
        "./src/utils/TypeCheck.ts"
      ],
      rules: { "@skylib/disallow-import/typescript": "off" }
    },
    {
      files: [
        "./src/misc/core/*",
        "./src/typescript/core/*",
        "./src/vue/core/*"
      ],
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
              "../../../rule-templates",
              "../../../utils",
              "../../misc",
              "../../rule-templates",
              "../../utils",
              "../misc",
              "../rule-templates",
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
                  "isSuboptions",
                  "defaultSuboptions",
                  "suboptionsKey",
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
            programOrder: [
              "ImportDeclaration",
              "ExportAllDeclaration",
              "ExportDeclaration",
              "ExportTypeDeclaration",
              "ExportFunctionDeclaration",
              "Unknown",
              "TypeDeclaration",
              "FunctionDeclaration",
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
          "off",
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
              "../../../rule-templates",
              "../../../typescript",
              "../../../utils",
              "../../misc",
              "../../rule-templates",
              "../../typescript",
              "../../utils",
              "../misc",
              "../rule-templates",
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
        "@skylib/primary-export-only": "off"
      }
    },
    {
      files: "./tests/**",
      rules: {
        "@skylib/match-filename/testRule-name": [
          // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
          // fixme
          "off",
          {
            format: "kebab-case",
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=testRule] > Literal:first-child"
          }
        ],
        "@skylib/match-filename/testRule-rule": [
          // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
          // fixme
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
