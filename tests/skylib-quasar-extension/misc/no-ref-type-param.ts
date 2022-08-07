import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/no-ref-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-ref-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "ref<boolean>(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
