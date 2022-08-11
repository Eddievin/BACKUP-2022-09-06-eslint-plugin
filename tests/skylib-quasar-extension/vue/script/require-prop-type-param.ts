import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/script/require-prop-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-prop-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "prop();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
