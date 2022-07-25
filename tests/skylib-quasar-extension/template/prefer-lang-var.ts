import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/template/prefer-lang-var"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-lang-var", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <div title="Text"></div>
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
