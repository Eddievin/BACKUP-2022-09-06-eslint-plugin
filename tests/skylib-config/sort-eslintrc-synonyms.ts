import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["config/sort-eslintrc-synonyms"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-eslintrc-synonyms", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = [2, 1];",
    output: "const x = [1, 2];",
    errors: [{ line: 1, messageId: MessageId.incorrectSortingOrder }]
  }
]);
