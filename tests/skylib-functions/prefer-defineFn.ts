/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/prefer-defineFn"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-defineFn", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export const x = o.assign(() => {}, {});
      export const y = Object.assign(() => {}, {});
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage }
    ]
  }
]);
