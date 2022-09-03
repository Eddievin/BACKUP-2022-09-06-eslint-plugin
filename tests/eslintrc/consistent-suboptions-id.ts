import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["eslintrc/consistent-suboptions-id"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-suboptions-id", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: {
          "@skylib/sort-keys": [
            "warn",
            {
              overrides: [
                { _id: "a-b" },
                { _id: "a.b" },
              ]
            }
          ]
        }
      };
    `,
    errors: [{ line: 7, messageId: MessageId.customMessage }]
  }
]);
