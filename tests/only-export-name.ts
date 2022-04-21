import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

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
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export class C {}
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export interface I {}
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export type T = string;
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        export const x = 1;
        export default 1;
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export const file = 1;
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
