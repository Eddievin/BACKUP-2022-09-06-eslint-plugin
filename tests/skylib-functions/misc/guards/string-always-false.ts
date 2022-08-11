import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/string-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("string-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.string(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
