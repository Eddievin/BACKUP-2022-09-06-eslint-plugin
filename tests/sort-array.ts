import { MessageId as BaseMessageId, sortArray } from "@/rules/sort-array";
import type { Rec } from "@skylib/functions";
import getCurrentLine from "get-current-line";
import { utils } from "@";

const MessageId: Rec<
  BaseMessageId | utils.sort.MessageId,
  BaseMessageId | utils.sort.MessageId
> = { ...BaseMessageId, ...utils.sort.MessageId };

utils.testRule("sort-array", sortArray, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "Identifier" }],
    code: "const id = 1;",
    errors: [{ messageId: MessageId.expectingArray }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "ArrayExpression" }],
    code: `
      const x = [
      {},
      "a",
      "c",
      // Comment
      "b"
      ];
    `,
    output: `
      const x = [
      {},
      "a",
      // Comment
      "b",
      "c"
      ];
    `,
    errors: [
      {
        line: 4,
        endLine: 6,
        messageId: MessageId.incorrectSortingOrder
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        key: "key",
        selector: "ArrayExpression",
        sendToBottom: /^bottom:/u.source,
        sendToTop: /^top:/u.source
      }
    ],
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
    `,
    errors: [
      {
        line: 3,
        endLine: 8,
        messageId: MessageId.incorrectSortingOrder
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "ArrayExpression" }],
    code: `
      const x = [
      {},
      "showConfirm.async: Failure",
      "showConfirm: Failure"
      ];
    `,
    output: `
      const x = [
      {},
      "showConfirm: Failure",
      "showConfirm.async: Failure"
      ];
    `,
    errors: [
      {
        line: 3,
        endLine: 4,
        messageId: MessageId.incorrectSortingOrder
      }
    ]
  }
]);
