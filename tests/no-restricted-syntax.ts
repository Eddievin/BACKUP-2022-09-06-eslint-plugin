import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("no-restricted-syntax", rules, [
  {
    code: "const id1 = [];",
    errors: [{ line: 1, messageId: "customMessage" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ selector: "Identifier" }] }]
  },
  {
    code: "const id1 = [];",
    errors: [{ line: 1, messageId: "customMessage" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ replacement: "id2", selector: ["Identifier"] }] }],
    output: "const id2 = [];"
  },
  {
    code: "const id1 = [];",
    errors: [
      {
        data: { message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            message: "Custom message",
            replacement: "e",
            search: /d/u.source,
            selector: ["Identifier"]
          }
        ]
      }
    ],
    output: "const ie1 = [];"
  }
]);
