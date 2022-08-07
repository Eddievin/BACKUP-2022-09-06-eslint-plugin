import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/array/prefer-truncate"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-truncate", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "[].length = 0;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
