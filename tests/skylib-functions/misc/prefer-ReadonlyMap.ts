/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/prefer-ReadonlyMap"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-ReadonlyMap", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = new Map<string, number>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
