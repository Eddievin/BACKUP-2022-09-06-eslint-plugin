import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["typescript/no-this-void"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-this-void", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "class C { f(this: void) {} }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
