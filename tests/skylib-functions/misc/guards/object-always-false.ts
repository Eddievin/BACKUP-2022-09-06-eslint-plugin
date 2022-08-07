import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/object-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("object-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.object(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
