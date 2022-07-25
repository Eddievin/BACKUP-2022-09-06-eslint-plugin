import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/false-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("false-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.false(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
