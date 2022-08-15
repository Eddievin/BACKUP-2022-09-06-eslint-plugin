import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/script/require-prop-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-prop-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      prop();
      prop.default();
      prop.required();
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
