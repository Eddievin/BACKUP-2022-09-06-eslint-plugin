import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/consistent-array-type-name"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-array-type-name", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type Cat = string[];
      type Progress = string[];
      type Cats = string[];
      type Progresses = string[];
      type CatArray = string[];
      type ProgressArray = string[];
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage }
    ]
  }
]);
