import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-distributed-function-props"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-distributed-function-props", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f() {}
      f.x = 1;
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
