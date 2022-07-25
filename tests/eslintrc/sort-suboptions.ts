import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["eslintrc/sort-suboptions"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-suboptions", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "@skylib/rule": [
              "warn",
              {
                rules: [{ _id: "b" }, { _id: "a" }]
              }
            ]
          }
        ]
      };
    `,
    output: `
      module.exports = {
        rules: [
          {
            "@skylib/rule": [
              "warn",
              {
                rules: [{ _id: "a" }, { _id: "b" }]
              }
            ]
          }
        ]
      };
    `,
    errors: [{ line: 7, messageId: MessageId.incorrectSortingOrder }]
  }
]);
