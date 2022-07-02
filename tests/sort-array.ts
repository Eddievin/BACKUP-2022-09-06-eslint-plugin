import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("sort-array", rules, [
  {
    code: `
      const x = [
      "a",
      "c",
      // Comment
      "b"
      ];
    `,
    errors: [
      {
        endLine: 4,
        line: 3,
        messageId: "incorrectSortingOrder"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ selector: "ArrayExpression" }] }],
    output: `
      const x = [
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
      { a: 1, key: "a" },
      { a: 2, key: "c" },
      { a: 3, key: "b" }
      ];
    `,
    errors: [
      {
        endLine: 4,
        line: 3,
        messageId: "incorrectSortingOrder"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ key: "key", selector: "ArrayExpression" }] }],
    output: `
      const x = [
      { a: 1, key: "a" },
      { a: 3, key: "b" },
      { a: 2, key: "c" }
      ];
    `
  }
]);
