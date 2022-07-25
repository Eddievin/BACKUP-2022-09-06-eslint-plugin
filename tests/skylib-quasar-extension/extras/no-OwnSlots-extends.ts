/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/extras/no-OwnSlots-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-OwnSlots-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface OwnSlots extends SampleInterface {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
