/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/types/prefer-PartialRecord"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-PartialRecord", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = Partial<Rec<string, number>>",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
