import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/converters/prefer-number"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-number", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Number(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
