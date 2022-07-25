import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["typescript/no-true-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-true-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
        x?: true;
        y?: boolean;
      }
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
