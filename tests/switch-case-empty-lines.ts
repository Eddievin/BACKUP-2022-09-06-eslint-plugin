import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("switch-case-empty-lines", rules, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      switch (x) {
        case 1:

        case 2:
          break;
        case 3:
      }
    `,
    output: `
      switch (x) {
        case 1:
        case 2:
          break;

        case 3:
      }
    `,
    errors: [
      { line: 4, messageId: "unexpectedEmptyLine" },
      { line: 6, messageId: "expectingEmptyLine" }
    ]
  }
]);
