import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/extras/no-empty-interfaces"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-empty-interfaces", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {}
      interface Props {}
      interface Slots {}
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
