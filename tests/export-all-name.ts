import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "export-all-name",
  rules,
  [
    {
      code: `
        export * as a from "b";
      `,
      errors: [{ line: 1, messageId: "invalidName" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        export * as aaaBbbCcc from "aaa-bbb-ccc";
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export * as AaaBbbCcc from "AaaBbbCcc";
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        export * as aaaBbbCcc from "aaaBbbCcc";
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
