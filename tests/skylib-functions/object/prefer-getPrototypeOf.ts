/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/object/prefer-getPrototypeOf"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-getPrototypeOf", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Object.getPrototypeOf({});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
