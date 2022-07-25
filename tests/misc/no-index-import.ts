import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["no-index-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-index-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'import x from ".";',
    errors: [{ line: 1, messageId: MessageId.disallowedSource }]
  }
]);
