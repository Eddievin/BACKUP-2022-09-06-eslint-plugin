import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/types/prefer-undefined-shorthand-literal"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-undefined-shorthand-literal", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = false | undefined;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
