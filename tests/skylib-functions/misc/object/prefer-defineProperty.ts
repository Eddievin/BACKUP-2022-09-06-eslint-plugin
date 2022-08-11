/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/prefer-defineProperty"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-defineProperty", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "export const f = o.assign(() => {}, {});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
