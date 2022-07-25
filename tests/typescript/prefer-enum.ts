import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["typescript/prefer-enum"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-enum", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'type T = "a" | "b";',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
