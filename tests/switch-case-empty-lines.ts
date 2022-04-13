import getCurrentLine from "get-current-line";
import switchCaseEmptyLines from "@/rules/switch-case-empty-lines";
import * as utils from "@/rules/utils";

utils.testRule("switch-case-empty-lines", switchCaseEmptyLines, [
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
