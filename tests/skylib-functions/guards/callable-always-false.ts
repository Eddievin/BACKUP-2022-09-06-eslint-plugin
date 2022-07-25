import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/callable-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("callable-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.callable([]);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
