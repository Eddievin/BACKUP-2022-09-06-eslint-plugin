/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/script/require-validateProps-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-validateProps-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "validateProps({})",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
