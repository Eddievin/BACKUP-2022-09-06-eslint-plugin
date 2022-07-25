import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["config/prettier"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "prettier",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "module.exports = {};",
      errors: [{ line: 1, messageId: MessageId.customMessage }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        module.exports = {
          arrowParens: "avoid",
          endOfLine: "lf",
          quoteProps: "preserve",
          trailingComma: "none"
        };
      `
    }
  ]
);
