import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["config/sort-commitlint"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-commitlint", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'module.exports = ["b", "a"];',
    output: 'module.exports = ["a", "b"];',
    errors: [{ line: 1, messageId: MessageId.incorrectSortingOrder }]
  }
]);
