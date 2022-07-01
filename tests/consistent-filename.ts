import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "consistent-filename",
  rules,
  [
    {
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "camel-case.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ],
      filename: "camelCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "camel-case.camel-case.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ],
      filename: "camelCase.camelCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "pascal-case.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ],
      filename: "PascalCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export const x = 1;",
      errors: [
        {
          data: { expected: "pascal-case.pascal-case.ts" },
          line: 1,
          messageId: "invalidFilename"
        }
      ],
      filename: "PascalCase.PascalCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: "export const x = 1;",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export const x = 1;",
      filename: "file.extras.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export const x = 1;",
      filename: "kebab-case.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export const x = 1;",
      filename: "kebab-case.kebab-case.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export const x = 1;",
      filename: "vue.d.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export default class PascalCase {}",
      filename: "PascalCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: "export class PascalCase {}",
      filename: "PascalCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
