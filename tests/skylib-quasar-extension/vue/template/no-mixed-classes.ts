import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/vue/template/no-mixed-classes"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-mixed-classes", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <div :class="\`\${$style.sampleClass} sample-class\`"></div>
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
