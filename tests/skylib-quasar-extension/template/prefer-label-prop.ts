import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/template/prefer-label-prop"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-label-prop", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <m-button>Text</m-button>
        <m-button>
          Text
        </m-button>
      </template>
    `,
    errors: [
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, endLine: 5, messageId: MessageId.customMessage }
    ]
  }
]);
