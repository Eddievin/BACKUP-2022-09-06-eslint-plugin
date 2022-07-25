/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/numStr-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("numStr-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.numStr(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
