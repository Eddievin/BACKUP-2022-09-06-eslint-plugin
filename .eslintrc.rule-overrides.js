/* eslint-disable @skylib/config/eslintrc/no-disable -- Ok */

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
      "warn",
      { disallow: ["natural-compare"] }
    ],
    "@skylib/disallow-import/typescript": [
      "warn",
      { disallow: ["tsutils", "typescript"] }
    ],
    "@skylib/match-filename/createRule-id": [
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
    "@skylib/match-filename/testRule-name": [
      "warn",
      {
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=testRule] > Literal:first-child"
      }
    ],
    "@skylib/match-filename/testRule-rule": [
      "warn",
      {
        format: "kebab-case",
        selector: "VariableDeclarator[id.name=rule] > .init > Literal.property"
      }
    ],
    "@skylib/match-filename/wrapRule": [
      "warn",
      {
        format: "camelCase",
        selector:
          "VariableDeclarator[init.callee.object.name=utils][init.callee.property.name=wrapRule] > Identifier.id"
      }
    ],
    "@skylib/no-restricted-syntax/no-skipped-tests": [
      "warn",
      {
        message: "No skipped tests",
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression > Property > Identifier.key[name=only]"
      }
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
    "@skylib/require-syntax/createRule-docs": [
      "warn",
      {
        message: 'Expecting "docs"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property > Identifier[name=docs]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule]"
      }
    ],
    "@skylib/require-syntax/fix": [
      "warn",
      {
        message: 'Expecting "fix" or "utils.sort"',
        selector:
          "Identifier[name=fix], MemberExpression[object.name=utils][property.name=sort]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property > Identifier[name=fixable]"
      }
    ],
    "@skylib/require-syntax/isOptions": [
      "warn",
      {
        message: 'Expecting "isOptions"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=isOptions]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=/^(?:defaultOptions|optionDescriptions|optionTypes)$/u]"
      }
    ],
    "@skylib/require-syntax/isSuboptions": [
      "warn",
      {
        message: 'Expecting "isSuboptions"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=isSuboptions]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=/^(?:defaultSuboptions|suboptionDescriptions|suboptionTypes|suboptionsKey)/u]"
      }
    ],
    "@skylib/require-syntax/no-restricted-syntax": [
      "warn",
      {
        message: 'Use "no-restricted-syntax" instead',
        selector: "[name=/^type[A-Z]/u]",
        trigger: 'Literal[value="typescript/no-restricted-syntax"]'
      }
    ],
    "@skylib/require-syntax/optionDescriptions": [
      "warn",
      {
        message: 'Expecting "optionDescriptions"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=optionDescriptions]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=isOptions]"
      }
    ],
    "@skylib/require-syntax/optionTypes": [
      "warn",
      {
        message: 'Expecting "optionTypes"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=optionTypes]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=isOptions]"
      }
    ],
    "@skylib/require-syntax/suboptionDescriptions": [
      "warn",
      {
        message: 'Expecting "suboptionDescriptions"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=suboptionDescriptions]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=isSuboptions]"
      }
    ],
    "@skylib/require-syntax/suboptionTypes": [
      "warn",
      {
        message: 'Expecting "suboptionTypes"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=suboptionTypes]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=isSuboptions]"
      }
    ],
    "@skylib/require-syntax/suboptionsKey": [
      "warn",
      {
        message: 'Expecting "isSuboptions"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=suboptionsKey]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] Identifier[name=/^(?:defaultSuboptions|isSuboptions)/u]"
      }
    ],
    "@skylib/require-syntax/vue-false": [
      "warn",
      {
        message: 'Use "vue = false"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property[key.name=create] > ArrowFunctionExpression[params.length<=1]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property[key.name=vue][value.value=true]"
      }
    ],
    "@skylib/require-syntax/vue-true": [
      "warn",
      {
        message: 'Use "vue = true"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property[key.name=create] > ArrowFunctionExpression[params.length>=2]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property[key.name=vue][value.value=false]"
      }
    ],
    "@skylib/require-syntax/wrapRule-docs": [
      "warn",
      {
        message: 'Expecting "docs"',
        selector:
          "CallExpression[callee.object.name=utils][callee.property.name=wrapRule] > ObjectExpression > Property > Identifier[name=docs]",
        trigger:
          "CallExpression[callee.object.name=utils][callee.property.name=wrapRule]"
      }
    ]
  },
  overrides: [
    { files: "./fixtures/**", rules: { "@skylib/consistent-filename": "off" } },
    {
      files: "./src/**",
      rules: {
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
            ]
          }
        ],
        "@skylib/sort-keys": [
          "warn",
          {
            overrides: [
              {
                _id: "utils.createRule",
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
                  "docs",
                  "create"
                ],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression"
              },
              {
                _id: "utils.createRule.docs",
                customOrder: [
                  "description",
                  "optionTypes",
                  "optionDescriptions",
                  "suboptionTypes",
                  "suboptionDescriptions",
                  "failExamples",
                  "passExamples"
                ],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property[key.name=docs] > ObjectExpression"
              },
              {
                _id: "utils.wrapRule",
                customOrder: ["rule", "options", "docs"],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=wrapRule] > ObjectExpression"
              }
            ]
          }
        ]
      }
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
        "@skylib/sort-statements": [
          "warn",
          {
            programOrder: [
              "ImportDeclaration",
              "ExportAllDeclaration",
              "ExportDeclaration",
              "ExportDefaultDeclaration",
              "ExportTypeDeclaration",
              "ExportFunctionDeclaration",
              "ExportUnknown",
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
      files: "./src/skylib-*/**",
      rules: {
        "@skylib/no-restricted-syntax/createRule-docs": [
          "warn",
          {
            message: 'Unexpected "docs"',
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=createRule] > ObjectExpression > Property > Identifier[name=docs]"
          }
        ],
        "@skylib/no-restricted-syntax/wrapRule-docs": [
          "warn",
          {
            message: 'Unexpected "docs"',
            selector:
              "CallExpression[callee.object.name=utils][callee.property.name=wrapRule] > ObjectExpression > Property > Identifier[name=docs]"
          }
        ],
        "@skylib/require-syntax/createRule-docs": "off",
        "@skylib/require-syntax/wrapRule-docs": "off"
      }
    },
    {
      files: "./src/utils/compare.ts",
      rules: { "@skylib/disallow-import/natural-compare": "off" }
    },
    {
      files: "./tests/**",
      rules: {
        "@skylib/no-restricted-syntax/no-ast": [
          "warn",
          {
            message: "Prefer string literal",
            selector: "Identifier[name=AST_NODE_TYPES]"
          }
        ],
        "@skylib/sort-keys": [
          "warn",
          {
            overrides: [
              {
                _id: "testRule",
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
                _id: "testRule.errors",
                customOrder: ["line", "endLine", "messageId"],
                selector:
                  "CallExpression[callee.object.name=utils][callee.property.name=testRule] > ArrayExpression > ObjectExpression > Property[key.name=errors] > ArrayExpression > ObjectExpression"
              }
            ]
          }
        ]
      }
    },
    {
      files: "./tests/eslintrc/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "eslintrc/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/jest/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "jest/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-config/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "config/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-config/eslintrc/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "config/eslintrc/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-facades/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "facades/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/jest/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/jest/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/array/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/array/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/converters/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/converters/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/guards/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/guards/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/json/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/json/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/object/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/object/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/program-flow/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/program-flow/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/reflect/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/reflect/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-functions/misc/types/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "functions/types/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/extras/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/extras/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/jest/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/jest/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/misc/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/vue/script/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/vue/script/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/skylib-quasar-extension/vue/template/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "quasar-extension/vue/template/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/typescript/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "typescript/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    },
    {
      files: "./tests/vue/**",
      rules: {
        "@skylib/match-filename/testRule-rule": [
          "warn",
          {
            prefix: "vue/",
            selector:
              "VariableDeclarator[id.name=rule] > .init > Literal.property"
          }
        ]
      }
    }
  ]
};
