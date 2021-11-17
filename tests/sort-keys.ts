import getCurrentLine from "get-current-line";

import sortKeys from "@/rules/sort-keys";
import * as utils from "@/rules/utils";

utils.testRule(
  "sort-keys",
  sortKeys,
  [
    {
      code: `
        const key = "key";
        const c = false;
        const x = {
          [key]: 5,
          f: 4,
          e: 3,
          d(): string {},
          ...{},
          c,
          "a": 2,
          B: 1
        }
      `,
      errors: [
        { line: 4, messageId: "incorrectSortingOrder" },
        { line: 9, messageId: "incorrectSortingOrder" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        const key = "key";
        const c = false;
        const x = {
          d(): string {},
          e: 3,
          f: 4,
          [key]: 5,
          ...{},
          B: 1,
          "a": 2,
          c
        }
      `
    },
    {
      code: `
        export default {
          b: 2,
          a: 1
        }
      `,
      errors: [{ line: 2, messageId: "incorrectSortingOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        export default {
          a: 1,
          b: 2
        }
      `
    }
  ],
  [
    {
      code: `
        export default {
          b: 2,
          a: 1
        }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreDefaultExport: true }]
    }
  ]
);
