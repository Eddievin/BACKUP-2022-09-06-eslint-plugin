import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-internal-modules"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-internal-modules", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      import x1 from "./folder/internal";
      import x2 from "package/internal";
      import x3 from "@scope/package/internal";
      import x4 from "./folder";
      import x5 from "package";
      import x6 from "@scope/package";
    `,
    errors: [
      { line: 1, messageId: MessageId.disallowedSource },
      { line: 2, messageId: MessageId.disallowedSource },
      { line: 3, messageId: MessageId.disallowedSource }
    ]
  }
]);
