/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/no-OwnSlots-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-OwnSlots-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface OwnSlots extends SampleInterface {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
