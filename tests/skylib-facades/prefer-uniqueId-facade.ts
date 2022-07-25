/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["facades/prefer-uniqueId-facade"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-uniqueId-facade", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "_.uniqueId();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
