/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/program-flow/prefer-setInterval"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-setInterval", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "setInterval(res);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
