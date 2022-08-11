/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/program-flow/prefer-setTimeout"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-setTimeout", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "setTimeout(res);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
