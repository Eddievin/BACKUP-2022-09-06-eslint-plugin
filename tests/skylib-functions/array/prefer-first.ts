import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/array/prefer-first"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-first", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "a.get(arr, 0);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
