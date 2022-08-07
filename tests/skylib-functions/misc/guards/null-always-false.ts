import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/null-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("null-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.null(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
