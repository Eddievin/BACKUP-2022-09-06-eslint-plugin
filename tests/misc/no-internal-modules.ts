import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-internal-modules"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-internal-modules", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      import x from "./dir/source";
      import y from "@scope/package/source";
      import z from "@scope/package";
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource }
    ]
  }
]);
