import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "no-expression-empty-line",
  rules,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        []
        .map(x => x)

        .map(x => x);
      `,
      output: `
        []
        .map(x => x)
        .map(x => x);
      `,
      errors: [{ line: 1, messageId: "unexpectedEmptyLine" }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        []
        .map(x => x)
        // Comment
        .map(x => x);
      `
    }
  ]
);
