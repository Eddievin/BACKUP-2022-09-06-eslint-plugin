import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/array/prefer-sort"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-sort", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "[].sort();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
