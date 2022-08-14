import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["class-only-export"];

const MessageId = utils.getMessageId(rule);

utils.testRule("class-only-export", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export class C {}
      export const x = 1;
    `,
    errors: [
      { line: 1, messageId: MessageId.invalidExport },
      { line: 2, messageId: MessageId.invalidExport }
    ]
  }
]);
