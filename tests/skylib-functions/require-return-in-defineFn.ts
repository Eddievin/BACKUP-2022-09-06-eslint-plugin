/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["functions/require-return-in-defineFn"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-return-in-defineFn", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export const f = defineFn(
        () => {},
        {
          x: () => {}
        }
      );
    `,
    errors: [
      { line: 2, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);
