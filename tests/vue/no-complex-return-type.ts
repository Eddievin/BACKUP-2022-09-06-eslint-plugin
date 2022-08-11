import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["vue/no-complex-return-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-complex-return-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f() { return { x: 1 } }
      function g(): object { return { x: 1 } }
      interface I { (): unknown; }
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
