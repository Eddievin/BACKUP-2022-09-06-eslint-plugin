import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "primary-export-only",
  rules,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export const file = 1;
        export default 1;
        export const x = 1;
        export function f() {}
        export class C {}
        export interface I {}
        export type T = string;
        export namespace N {}
        export { y };
      `,
      errors: [
        { line: 2, messageId: "invalidExport" },
        { line: 3, messageId: "invalidExport" },
        { line: 4, messageId: "invalidExport" },
        { line: 5, messageId: "invalidExport" },
        { line: 6, messageId: "invalidExport" },
        { line: 7, messageId: "invalidExport" },
        { line: 8, messageId: "invalidExport" },
        { line: 9, messageId: "invalidExport" }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export default 1;
        export const x = 1;
      `
    }
  ]
);
