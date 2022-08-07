import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/boolean-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("boolean-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.boolean(true);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
