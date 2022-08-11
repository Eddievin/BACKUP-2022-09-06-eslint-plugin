import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-enum-members"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-enum-members", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      enum E {
        a = "x",
        b = "b"
      }
    `,
    errors: [{ line: 2, messageId: MessageId.inconsistentMember }]
  }
]);
