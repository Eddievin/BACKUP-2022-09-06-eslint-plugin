import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "no-expression-empty-line",
  rules,
  [
    {
      code: `
        []
        .map(x => x)

        .map(x => x);
      `,
      errors: [{ line: 1, messageId: "unexpectedEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        []
        .map(x => x)
        .map(x => x);
      `
    }
  ],
  [
    {
      code: `
        []
        .map(x => x)
        // Comment
        .map(x => x);
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
