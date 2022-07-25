import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/cast/prefer-string"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-string", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "String(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
