import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/vue/script/no-global-lang"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-global-lang", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'import { lang } from "@skylib/facades";',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
