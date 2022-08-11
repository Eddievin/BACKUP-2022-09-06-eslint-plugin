import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-at-sign-internal-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-at-sign-internal-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      import y from "@/source";
      import x from "@";
    `,
    errors: [{ line: 1, messageId: MessageId.disallowedSource }]
  }
]);
