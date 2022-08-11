import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-relative-parent-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-relative-parent-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ allow: ["../allowed-source"] }],
    code: `
      import * as x from "../source";
      import * as y from "../allowed-source";
    `,
    errors: [{ line: 1, messageId: MessageId.disallowedSource }]
  }
]);
