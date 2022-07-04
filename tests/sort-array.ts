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
    options: [{ selector: "ArrayExpression" }],
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
      { ...{}, a: 1, key: "top:x" },
      { ...{}, a: 2, key: "bottom:y" },
      { ...{}, a: 3, key: "bottom:x" },
      { ...{}, a: 4, key: "a" },
      { ...{}, a: 5, key: "c" },
      { ...{}, a: 6, key: "b" },
      { ...{}, a: 7, key: "top:y" }
      ];
    `,
    errors: [
      {
        data: { _id: "id" },
        endLine: 8,
        line: 3,
        messageId: "incorrectSortingOrder"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        key: "key",
        selector: "ArrayExpression",
        sendToBottom: /^bottom:/u.source,
        sendToTop: /^top:/u.source
      }
    ],
    output: `
      const x = [
      { ...{}, a: 1, key: "top:x" },
      { ...{}, a: 7, key: "top:y" },
      { ...{}, a: 4, key: "a" },
      { ...{}, a: 6, key: "b" },
      { ...{}, a: 5, key: "c" },
      { ...{}, a: 3, key: "bottom:x" },
      { ...{}, a: 2, key: "bottom:y" }
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
    options: [{ selector: "Identifier" }]
  }
]);
