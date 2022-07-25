import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/number-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("number-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.number(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
