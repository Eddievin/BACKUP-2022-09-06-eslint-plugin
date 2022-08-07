import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/null-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("null-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.null(null);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
