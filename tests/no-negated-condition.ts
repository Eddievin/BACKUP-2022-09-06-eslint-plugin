import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("no-negated-condition", rules, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      if (!1) {}
      if (1 !== 0) {}
      if (1) {}
      if (1 === 0) {}
    `,
    errors: [
      { line: 1, messageId: "noNegatedCondition" },
      { line: 2, messageId: "noNegatedCondition" }
    ]
  }
]);
