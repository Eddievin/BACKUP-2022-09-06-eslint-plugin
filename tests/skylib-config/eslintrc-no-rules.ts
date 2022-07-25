import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["config/eslintrc-no-rules"];

const MessageId = utils.getMessageId(rule);

utils.testRule("eslintrc-no-rules", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: {}
      };
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
