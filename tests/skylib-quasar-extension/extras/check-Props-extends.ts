/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/check-Props-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("check-Props-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface Props extends SampleInterface {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
