import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["no-underscore-export"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-underscore-export", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export const _x = 1;
      export function _f() {}
      export const x = 1;
      export function f() {}
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage }
    ]
  }
]);
