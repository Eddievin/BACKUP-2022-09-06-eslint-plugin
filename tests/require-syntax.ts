import { MessageId, requireSyntax } from "@/rules/require-syntax";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule(
  "require-syntax",
  requireSyntax,
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
        { selector: "Identifier[name=x]", trigger: "Identifier[name=y]" }
      ],
      code: "const y = 1;",
      errors: [{ line: 1, messageId: MessageId.customMessage }]
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
