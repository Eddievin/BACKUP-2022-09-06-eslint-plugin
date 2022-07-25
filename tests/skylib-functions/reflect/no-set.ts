import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/reflect/no-set"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-set", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'reflect.set({}, "x")',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
