import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/not-empty-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("not-empty-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.not.empty(null);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
