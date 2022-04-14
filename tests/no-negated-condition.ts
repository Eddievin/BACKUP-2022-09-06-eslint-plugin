import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule("no-negated-condition", rules, [
  {
    code: `
      if (!1) {}
      if (1 !== 0) {}
      if (1) {}
      if (1 === 0) {}
    `,
    errors: [
      { line: 1, messageId: "noNegatedCondition" },
      { line: 2, messageId: "noNegatedCondition" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
