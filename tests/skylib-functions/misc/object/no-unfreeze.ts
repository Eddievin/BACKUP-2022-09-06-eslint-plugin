import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/object/no-unfreeze"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unfreeze", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "o.unfreeze();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
