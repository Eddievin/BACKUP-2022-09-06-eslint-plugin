import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("sort-keys", rules, [
  {
    name: `Test at line ${getCurrentLine().line}`,
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
    `,
    errors: [
      {
        endLine: 7,
        line: 4,
        messageId: "incorrectSortingOrder"
      },
      {
        endLine: 12,
        line: 9,
        messageId: "incorrectSortingOrder"
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export default {
        b: 2,
        a: 1
      }
    `,
    output: `
      export default {
        a: 1,
        b: 2
      }
    `,
    errors: [
      {
        endLine: 3,
        line: 2,
        messageId: "incorrectSortingOrder"
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export default {
        a: 1,
        c: 3,
        b: 2,
        d: 4
      }
    `,
    output: `
      export default {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }
    `,
    errors: [
      {
        endLine: 4,
        line: 3,
        messageId: "incorrectSortingOrder"
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        overrides: [
          {
            _id: "id",
            customOrder: ["a", "d"],
            selector: "VariableDeclarator[id.name=y] > ObjectExpression"
          }
        ]
      }
    ],
    code: `
      const x = {
        a: 1,
        c: 3,
        b: 2,
        d: 4
      };
      const y = {
        a: 1,
        c: 3,
        b: 2,
        d: 4
      };
    `,
    output: `
      const x = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
      };
      const y = {
        a: 1,
        d: 4,
        b: 2,
        c: 3
      };
    `,
    errors: [
      {
        endLine: 4,
        line: 3,
        messageId: "incorrectSortingOrder"
      },
      {
        endLine: 11,
        line: 9,
        messageId: "incorrectSortingOrder"
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ overrides: [{ _id: "id", selector: "Identifier" }] }],
    code: "const id = 1;",
    errors: [
      {
        data: { _id: "id" },
        endLine: 1,
        line: 1,
        messageId: "expectingObject"
      }
    ]
  }
]);
