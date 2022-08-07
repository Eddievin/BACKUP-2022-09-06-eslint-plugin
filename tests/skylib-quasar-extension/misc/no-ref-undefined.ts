import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/no-ref-undefined"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-ref-undefined", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "ref(undefined);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
