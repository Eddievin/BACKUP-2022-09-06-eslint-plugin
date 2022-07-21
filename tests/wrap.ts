import { MessageId, wrap } from "@/rules/wrap";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("wrap", wrap, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rule: "@typescript-eslint/no-shadow" }],
    code: `
      const value = 1;
      enum E { value = "value" }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          message:
            "'value' is already declared in the upper scope on line 1 column 7."
        }
      }
    ]
  }
]);
