import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/array/prefer-third"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-third", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "a.get(arr, 2);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
