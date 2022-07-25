import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["vue/no-empty-lines"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-empty-lines", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p></p>

        <p></p>
      </template>
    `,
    errors: [{ line: 2, endLine: 4, messageId: MessageId.customMessage }]
  }
]);
