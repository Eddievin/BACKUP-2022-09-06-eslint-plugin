/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/jest/prefer-mockCallsToBe"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-mockCallsToBe", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "expect(() => {}).toHaveBeenCalled();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
