import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["sort-construct-signature"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-construct-signature", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
       x: string;
       new (): string;
      }
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);
