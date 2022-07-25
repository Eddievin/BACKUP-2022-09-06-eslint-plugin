/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/extras/prefer-OwnSlots"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-OwnSlots", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface Slots { x: string; }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
