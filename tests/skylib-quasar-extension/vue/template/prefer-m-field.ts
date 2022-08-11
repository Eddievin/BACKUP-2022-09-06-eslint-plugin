import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/prefer-m-field"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-m-field", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <q-field />
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
