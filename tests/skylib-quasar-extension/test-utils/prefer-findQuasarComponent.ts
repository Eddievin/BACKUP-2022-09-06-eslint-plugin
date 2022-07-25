/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/test-utils/prefer-findQuasarComponent"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-findQuasarComponent", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "wrapper.findComponent(QBtn);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
