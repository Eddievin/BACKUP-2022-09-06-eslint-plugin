/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/guards/indexedObject-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("indexedObject-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.indexedObject({});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
