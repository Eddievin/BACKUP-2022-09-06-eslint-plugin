/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/jest/prefer-mockCallsToBe"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-mockCallsToBe", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "expect(() => {}).toHaveBeenCalled();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
