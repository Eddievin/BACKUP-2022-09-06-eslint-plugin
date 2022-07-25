import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["require-syntax"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "require-syntax",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ selector: "Identifier[name=x]" }],
      code: "const y = 1;",
      errors: [{ line: 1, messageId: MessageId.customMessage }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          message: "Sample message",
          selector: "Identifier[name=x]",
          trigger: "Identifier[name=y]"
        }
      ],
      code: "const y = 1;",
      errors: [
        {
          line: 1,
          messageId: MessageId.customMessage,
          data: { message: "Sample message" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ selector: "Identifier[name=x]" }],
      code: "const x = 1;"
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { selector: "Identifier[name=x]", trigger: "Identifier[name=y]" }
      ],
      code: "const z = 1;"
    }
  ]
);
