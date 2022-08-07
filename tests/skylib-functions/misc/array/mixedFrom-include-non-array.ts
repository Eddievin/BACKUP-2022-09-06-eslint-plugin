/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/array/mixedFrom-include-non-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("mixedFrom-include-non-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "a.fromMixed([]);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
