import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "consistent-filename",
  rules,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.ts",
      options: [{ format: "PascalCase" }],
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "CamelCase.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "camelCase.camelCase.ts",
      options: [{ format: "kebab-case" }],
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "camel-case.camel-case.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      options: [{ format: "camelCase" }],
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "pascalCase.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.PascalCase.ts",
      options: [{ format: "kebab-case" }],
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "pascal-case.pascal-case.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.ts",
      options: [{ format: "PascalCase" }],
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "KebabCase.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.kebab-case.ts",
      options: [{ format: "camelCase" }],
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "kebabCase.kebab-case.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export const x = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "file.extras.ts",
      code: "export const x = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.ts",
      code: "export const x = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "kebab-case.kebab-case.ts",
      code: "export const x = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "vue.d.ts",
      code: "export const x = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: "export default class PascalCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: "export class PascalCase {}"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      options: [
        {
          overrides: [
            {
              _id: "id",
              format: "PascalCase",
              selector:
                "Program > ExportDefaultDeclaration > CallExpression > Identifier.callee[name=defineComponent]"
            }
          ]
        }
      ],
      code: "export default defineComponent({});"
    }
  ]
);
