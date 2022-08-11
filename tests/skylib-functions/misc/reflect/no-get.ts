import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/reflect/no-get"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-get", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'reflect.get({}, "x")',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
