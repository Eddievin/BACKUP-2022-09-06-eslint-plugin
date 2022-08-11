import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/sort-v-bind"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-v-bind", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <slot v-bind="obj" prop="abc"></slot>
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
