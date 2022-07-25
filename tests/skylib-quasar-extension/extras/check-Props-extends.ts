/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["quasar-extension/extras/check-Props-extends"];

const MessageId = utils.getMessageId(rule);

utils.testRule("check-Props-extends", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "interface Props extends SampleInterface {}",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
