/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/test-utils/prefer-testComponents"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-testComponents", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "wrapper.findComponent(components.BaseButton);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
