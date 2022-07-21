import {
  MessageId,
  switchCaseEmptyLines
} from "@/rules/switch-case-empty-lines";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("switch-case-empty-lines", switchCaseEmptyLines, [
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
      { line: 4, endLine: 5, messageId: MessageId.removeEmptyLine },
      { line: 6, messageId: MessageId.addEmptyLine }
    ]
  }
]);
