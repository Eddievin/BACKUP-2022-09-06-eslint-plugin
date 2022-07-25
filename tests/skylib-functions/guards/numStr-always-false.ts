/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/numStr-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("numStr-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.numStr(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
