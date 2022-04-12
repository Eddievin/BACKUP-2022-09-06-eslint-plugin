import getCurrentLine from "get-current-line";

import functionPropertiesStyle from "@/rules/function-properties-style";
import * as utils from "@/rules/utils";

utils.testRule(
  "function-properties-style",
  functionPropertiesStyle,
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
