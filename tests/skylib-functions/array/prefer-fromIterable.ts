/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/array/prefer-fromIterable"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-fromIterable", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "[...arr]",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
