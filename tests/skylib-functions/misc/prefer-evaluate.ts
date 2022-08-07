import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/prefer-evaluate"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-evaluate", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "(() => {})();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
