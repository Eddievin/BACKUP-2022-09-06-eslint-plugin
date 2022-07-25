import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/reflect/prefer-reflect"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-reflect", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'Reflect.get({}, "x")',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
