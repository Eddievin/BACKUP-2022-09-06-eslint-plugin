import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["no-unnecessary-as-const"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-as-const", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x: I = { value: 1 } as const;
      const y = { value: 1 } as const;
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
