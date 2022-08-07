import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/object/prefer-keys"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-keys", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Object.keys();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
