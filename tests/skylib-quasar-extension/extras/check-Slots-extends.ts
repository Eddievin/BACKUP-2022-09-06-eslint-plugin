/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/check-Slots-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("check-Slots-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface Slots extends SampleInterface {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
