import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["typescript/prefer-readonly-property"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-readonly-property", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
        x: string;
        readonly y: string;
      }
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
