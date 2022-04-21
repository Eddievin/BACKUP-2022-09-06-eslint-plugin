import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

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
    }
  ]
);
