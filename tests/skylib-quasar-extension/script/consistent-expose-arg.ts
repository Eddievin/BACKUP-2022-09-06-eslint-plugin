import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/script/consistent-expose-arg"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-expose-arg", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "expose({});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
