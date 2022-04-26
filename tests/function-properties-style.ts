import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "function-properties-style",
  rules,
  [
    {
      code: `
        function f() {}
        f.x = 1;
      `,
      errors: [{ line: 2, messageId: "noDistributedDefinition" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        const x = { y: 1 };
        x.y = 2;
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
