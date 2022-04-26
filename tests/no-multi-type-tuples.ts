import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("no-multi-type-tuples", rules, [
  {
    code: `
      type T1 = [string, number];
      type T2 = [string, string];
    `,
    errors: [{ line: 1, messageId: "multiTypeTuplesDisallowed" }],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
