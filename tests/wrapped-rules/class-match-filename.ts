import {
  MessageId,
  classMatchFilename
} from "@/wrapped-rules/class-match-filename";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("class-match-filename", classMatchFilename, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    filename: "kebab-case.ts",
    code: `
      export class ClassName {}
      export class KebabCase {}
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.invalidText,
        data: { expected: "KebabCase" }
      }
    ]
  }
]);
