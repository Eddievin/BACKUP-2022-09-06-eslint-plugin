import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/template/sort-v-bind"];

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
