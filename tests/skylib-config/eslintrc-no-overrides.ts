import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["config/eslintrc-no-overrides"];

const MessageId = utils.getMessageId(rule);

utils.testRule("eslintrc-no-overrides", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        overrides: {}
      };
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
