import getCurrentLine from "get-current-line";

import noMutableSignature from "@/rules/no-mutable-signature";
import * as utils from "@/rules/utils";

utils.testRule(
  "no-mutable-signature",
  noMutableSignature,
  [
    {
      code: `
        const x: I;

        function f(): I {}

        function g(x: I) {}

        interface I {
          [K: number]: unknown;
          [K: string]: unknown;
        }
      `,
      errors: [
        {
          data: { definition: "I", name: "I" },
          line: 1,
          messageId: "noMutableNumberSignature"
        },
        {
          data: { definition: "I", name: "I" },
          line: 1,
          messageId: "noMutableStringSignature"
        },
        {
          data: { definition: "I", name: "I" },
          line: 3,
          messageId: "noMutableNumberSignature"
        },
        {
          data: { definition: "I", name: "I" },
          line: 3,
          messageId: "noMutableStringSignature"
        },
        {
          data: { definition: "I", name: "I" },
          line: 5,
          messageId: "noMutableNumberSignature"
        },
        {
          data: { definition: "I", name: "I" },
          line: 5,
          messageId: "noMutableStringSignature"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        function f1(x: readonly unknown[][]) {}

        function f2(...args: unknown[]) {}

        function f3(...args: unknown[][]) {}

        function f4(...args: Array<readonly unknown[]>) {}

        function f5(...args) {}
      `,
      errors: [
        {
          data: {
            definition: "readonly unknown[][] > unknown[]",
            name: "ReadonlyArray > Array"
          },
          line: 1,
          messageId: "noMutableNumberSignature"
        },
        {
          data: {
            definition: "unknown[][] > unknown[]",
            name: "Array > Array"
          },
          line: 5,
          messageId: "noMutableNumberSignature"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        const x: Record<string, unknown> = {};

        const y: Record<string, unknown> = {};
      `,
      errors: [
        {
          data: {
            definition: "Record<string, unknown>",
            name: "__type"
          },
          line: 1,
          messageId: "noMutableStringSignature"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreIdentifiers: ["^y$"] }]
    }
  ],
  [
    {
      code: `
        function f<T extends object>(x: T);
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        interface I {
          [K: number]: unknown;
        }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreNumberSignature: true }]
    },
    {
      code: `
        interface I {
          [K: string]: unknown;
        }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreStringSignature: true }]
    }
  ]
);
