import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-source-extension"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-source-extension", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      import x1 from "source.js";
      import x2 from "source.json";
      import x3 from "source.ts";
      import y1 from "./source.js";
      import y2 from "./source.json";
      import y3 from "./source.ts";
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage },
      { line: 5, messageId: MessageId.customMessage },
      { line: 6, messageId: MessageId.customMessage }
    ]
  }
]);
