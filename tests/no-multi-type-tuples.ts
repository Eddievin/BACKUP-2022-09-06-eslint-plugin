import getCurrentLine from "get-current-line";
import noMultiTypeTuples from "@/rules/no-multi-type-tuples";
import * as utils from "@/rules/utils";

utils.testRule("no-multi-type-tuples", noMultiTypeTuples, [
  {
    code: `
      type T1 = [string, number];
      type T2 = [string, string];
    `,
    errors: [{ line: 1, messageId: "multiTypeTuplesDisallowed" }],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
