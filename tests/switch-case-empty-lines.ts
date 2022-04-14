import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule("switch-case-empty-lines", rules, [
  {
    code: `
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
    ],
    name: `Test at line ${getCurrentLine().line}`,
    output: `
      switch (x) {
        case 1:
        case 2:
          break;

        case 3:
      }
    `
  }
]);
