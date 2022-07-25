import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/symbol-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("symbol-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.symbol(Symbol());",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
