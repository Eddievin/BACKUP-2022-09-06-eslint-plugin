import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["restrict-identifier-characters"];

const MessageId = utils.getMessageId(rule);

utils.testRule("restrict-identifier-characters", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const абв = 1;
      const $x1 = 2;
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
