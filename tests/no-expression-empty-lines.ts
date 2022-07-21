import {
  MessageId,
  noExpressionEmptyLines
} from "@/rules/no-expression-empty-lines";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "no-expression-empty-lines",
  noExpressionEmptyLines,
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
      errors: [
        { line: 3, messageId: MessageId.unexpectedEmptyLine },
        { line: 5, messageId: MessageId.unexpectedEmptyLine }
      ]
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
