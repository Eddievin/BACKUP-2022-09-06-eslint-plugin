import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["config/eslintrc-no-disable"];

const MessageId = utils.getMessageId(rule);

utils.testRule("eslintrc-no-disable", rule, [
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
