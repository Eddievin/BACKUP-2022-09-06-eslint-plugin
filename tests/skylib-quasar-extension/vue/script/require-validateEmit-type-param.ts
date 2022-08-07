/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule =
  rules["quasar-extension/vue/script/require-validateEmit-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-validateEmit-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "validateEmit({})",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
