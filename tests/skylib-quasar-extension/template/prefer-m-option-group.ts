import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/template/prefer-m-option-group"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-m-option-group", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <q-option-group />
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
