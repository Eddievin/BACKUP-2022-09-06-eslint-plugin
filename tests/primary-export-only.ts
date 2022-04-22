import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "primary-export-only",
  rules,
  [
    {
      code: `
        export const file = 1;
        export default 1;
        export const x = 1;
        export function f() {}
        export class C {}
        export interface I {}
        export type T = string;
      `,
      errors: [
        { line: 2, messageId: "invalidExport" },
        { line: 3, messageId: "invalidExport" },
        { line: 4, messageId: "invalidExport" },
        { line: 5, messageId: "invalidExport" },
        { line: 6, messageId: "invalidExport" },
        { line: 7, messageId: "invalidExport" }
      ],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        export default 1;
        export const x = 1;
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
