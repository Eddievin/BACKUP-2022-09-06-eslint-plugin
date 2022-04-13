import getCurrentLine from "get-current-line";
import noExpressionEmptyLine from "@/rules/no-expression-empty-line";
import * as utils from "@/rules/utils";

utils.testRule("no-expression-empty-line", noExpressionEmptyLine, [
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
]);
