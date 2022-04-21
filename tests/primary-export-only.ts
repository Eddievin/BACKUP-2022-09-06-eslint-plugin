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
      `,
      errors: [
        { line: 2, messageId: "invalidExport" },
        { line: 3, messageId: "invalidExport" }
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
