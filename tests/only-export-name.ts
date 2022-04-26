import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "only-export-name",
  rules,
  [
    {
      code: `
        export const x = 1;
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export function f() {}
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      filename: "camelCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export class C {}
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      filename: "kebab-case.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export interface I {}
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      filename: "PascalCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export type T = string;
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export namespace N {}
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        export { default } from "a";
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const x = 1;
        export default 1;
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const x = 1;
        export { y };
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const x = 1;
        export { y as z };
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const file = 1;
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const camelCase = 1;
      `,
      filename: "camelCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const kebabCase = 1;
      `,
      filename: "kebab-case.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const PascalCase = 1;
      `,
      filename: "PascalCase.ts",
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const subfolder = 1;
      `,
      filename: "subfolder/index.ts",
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
