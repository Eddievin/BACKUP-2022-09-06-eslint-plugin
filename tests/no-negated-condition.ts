import getCurrentLine from "get-current-line";
import noNegatedCondition from "@/rules/no-negated-condition";
import * as utils from "@/rules/utils";

utils.testRule("no-negated-condition", noNegatedCondition, [
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
