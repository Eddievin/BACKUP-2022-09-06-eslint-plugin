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
          [key]: 6,
          f: 5,
          e: 4,
          d(): string {},
          ...{},
          c,
          "a": 3,
          B: 2,
          [/.*/u.source]: 1
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
          e: 4,
          f: 5,
          [key]: 6,
          ...{},
          [/.*/u.source]: 1,
          B: 2,
          "a": 3,
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
