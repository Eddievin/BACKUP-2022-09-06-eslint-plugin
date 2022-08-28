import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["eslintrc/no-unnecessary-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        overrides: [
          {
            files: ["./a"]
          }
        ]
      };
    `,
    errors: [{ line: 4, messageId: MessageId.customMessage }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: [
          {
            "@skylib/rule": [
              "warn",
              {
                selector: ["a"]
              }
            ]
          }
        ]
      };
    `,
    errors: [{ line: 7, messageId: MessageId.customMessage }]
  }
]);
