import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-never"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-never", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x: I = { f: value => {} };
      interface I {
        [key: string]: (value: never) => void;
      }
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
