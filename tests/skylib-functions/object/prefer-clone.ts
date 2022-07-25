import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/object/prefer-clone"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-clone", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = { ...obj };",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
