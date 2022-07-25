/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/prefer-ReadonlySet"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-ReadonlySet", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = new Set<number>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
