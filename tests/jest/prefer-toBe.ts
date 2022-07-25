/* eslint-disable @skylib/match-filename/project/testRule-name -- Ok */

import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["jest/prefer-toBe"];

const MessageId = utils.getMessageId(rule);

utils.testRule("jest-prefer-toBe", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = 1;
      const y = {};
      expect(1).toStrictEqual(x);
      expect(1).toStrictEqual(y);
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);
