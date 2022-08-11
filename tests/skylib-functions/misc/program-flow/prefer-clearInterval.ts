/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/program-flow/prefer-clearInterval"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-clearInterval", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "clearInterval(res);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
