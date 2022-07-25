import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/types/prefer-undefined-shorthand-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-undefined-shorthand-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = boolean | undefined;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
