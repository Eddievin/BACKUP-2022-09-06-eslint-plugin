import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/array-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("array-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.array([]);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
