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
          e: 5,
          d(): string {},
          ["f" as string]: 4,
          ...{},
          c,
          "a": 3,
          B: 2,
          [/.*/u.source]: 1
        }
      `,
      errors: [
        { endLine: 7, line: 4, messageId: "incorrectSortingOrder" },
        { endLine: 12, line: 9, messageId: "incorrectSortingOrder" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        const key = "key";
        const c = false;
        const x = {
          ["f" as string]: 4,
          d(): string {},
          e: 5,
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
      errors: [{ endLine: 3, line: 2, messageId: "incorrectSortingOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        export default {
          a: 1,
          b: 2
        }
      `
    },
    {
      code: `
        export default {
          a: 1,
          c: 3,
          b: 2,
          d: 4
        }
      `,
      errors: [{ endLine: 4, line: 3, messageId: "incorrectSortingOrder" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        export default {
          a: 1,
          b: 2,
          c: 3,
          d: 4
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
    },
    {
      code: `
        export default {
          b: 2,
          // @skylib/sort-keys break
          a: 1
        }
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
