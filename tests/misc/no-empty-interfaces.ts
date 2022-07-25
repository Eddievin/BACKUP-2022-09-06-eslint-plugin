import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["no-empty-interfaces"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-empty-interfaces", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {}
      interface J { x: string; }
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
