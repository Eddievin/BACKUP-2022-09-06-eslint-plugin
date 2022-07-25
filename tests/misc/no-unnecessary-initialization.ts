import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["no-unnecessary-initialization"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-initialization", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = undefined;
      class C {
        x = undefined;
      }
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
