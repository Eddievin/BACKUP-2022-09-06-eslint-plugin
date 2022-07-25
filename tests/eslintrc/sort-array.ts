import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["eslintrc/sort-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'module.exports = { overrides: [{ files: ["*.ts", "*.js"] }] };',
    output: 'module.exports = { overrides: [{ files: ["*.js", "*.ts"] }] };',
    errors: [{ line: 1, messageId: MessageId.incorrectSortingOrder }]
  }
]);
