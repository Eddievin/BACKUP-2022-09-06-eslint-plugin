/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["jest/no-toThrow-literal"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-toThrow-literal", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'expect(() => {}).toThrow("Error message");',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
