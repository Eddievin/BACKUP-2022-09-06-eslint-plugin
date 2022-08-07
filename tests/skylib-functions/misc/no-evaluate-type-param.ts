import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/no-evaluate-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-evaluate-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "evaluate<T>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
