/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/types/prefer-undefined-shorthand-typeName"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-undefined-shorthand-typeName", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = NumStr | undefined;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
