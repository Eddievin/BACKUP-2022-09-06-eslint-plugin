/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/types/prefer-WritableIndexedObject"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-WritableIndexedObject", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = WritableRecord<PropertyKey, string>",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
