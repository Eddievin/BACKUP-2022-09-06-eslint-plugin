/* eslint-disable @skylib/match-filename/testRule-name -- Postponed */

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/no-Writable"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-Writable", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = Writable<IndexedObject<string>>",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
