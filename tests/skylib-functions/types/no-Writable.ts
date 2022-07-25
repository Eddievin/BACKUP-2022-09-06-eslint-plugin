/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/types/no-Writable"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-Writable", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = Writable<IndexedObject<string>>",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
