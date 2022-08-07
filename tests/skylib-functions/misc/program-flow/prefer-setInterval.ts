/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/program-flow/prefer-setInterval"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-setInterval", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "setInterval(res);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
