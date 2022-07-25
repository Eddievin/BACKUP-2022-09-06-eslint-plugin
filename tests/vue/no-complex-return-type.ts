import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["vue/no-complex-return-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-complex-return-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "function f() { return { x: 1 } }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
