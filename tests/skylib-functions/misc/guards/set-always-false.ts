import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/set-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("set-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.set(false, is.string);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
