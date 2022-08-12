import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["config/eslintrc/no-disable"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-disable", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: {
          rule: "off"
        }
      };
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);
