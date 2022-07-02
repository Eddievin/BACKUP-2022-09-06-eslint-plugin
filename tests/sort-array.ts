import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("sort-array", rules, [
  {
    code: `
      const x = [
      {},
      "a",
      "c",
      // Comment
      "b"
      ];
    `,
    errors: [
      {
        data: { _id: "id" },
        endLine: 6,
        line: 4,
        messageId: "incorrectSortingOrder"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ _id: "id", selector: "ArrayExpression" }] }],
    output: `
      const x = [
      {},
      "a",
      // Comment
      "b",
      "c"
      ];
    `
  },
  {
    code: `
      const x = [
      { ...{}, a: 1, key: "a" },
      { ...{}, a: 2, key: "c" },
      { ...{}, a: 3, key: "b" }
      ];
    `,
    errors: [
      {
        data: { _id: "id" },
        endLine: 4,
        line: 3,
        messageId: "incorrectSortingOrder"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            key: "key",
            selector: "ArrayExpression"
          }
        ]
      }
    ],
    output: `
      const x = [
      { ...{}, a: 1, key: "a" },
      { ...{}, a: 3, key: "b" },
      { ...{}, a: 2, key: "c" }
      ];
    `
  },
  {
    code: "const id = 1;",
    errors: [
      {
        data: { _id: "id" },
        endLine: 1,
        line: 1,
        messageId: "expectingArray"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ _id: "id", selector: "Identifier" }] }]
  }
]);
