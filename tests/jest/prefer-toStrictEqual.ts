/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["jest/prefer-toStrictEqual"];

const MessageId = utils.getMessageId(rule);

utils.testRule("jest-prefer-toStrictEqual", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = {};
      const y = 1;
      expect(1).toBe(x);
      expect(1).toBe(y);
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);
