import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["class-match-filename"];

const MessageId = utils.getMessageId(rule);

utils.testRule("class-match-filename", rule, [
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
