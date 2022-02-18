import getCurrentLine from "get-current-line";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

import preferReadonly from "@/rules/prefer-readonly";
import * as utils from "@/rules/utils";

utils.testRule(
  "prefer-readonly",
  preferReadonly,
  [
    {
      code: `
        function f(x: { value: number }) {}
        function g(x: { readonly value: number }) {}

        interface I { value: number; }
        interface J { readonly value: number; }
      `,
      errors: [
        {
          data: {
            definition: "{ value: number; }",
            name: "__type"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        },
        {
          data: {
            definition: "I",
            name: "I"
          },
          line: 4,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        function f(x: { value: number }) {}
        function g(x: { readonly value: number }) {}
      `,
      errors: [
        {
          data: {
            definition: "{ value: number; }",
            name: "__type"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          includeSelectors: [AST_NODE_TYPES.FunctionDeclaration],
          noDefaultSelectors: true
        }
      ]
    },
    {
      code: `
        interface I { value: number; }
        interface J { readonly value: number; }
      `,
      errors: [
        {
          data: {
            definition: "I",
            name: "I"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          includeSelectors: [AST_NODE_TYPES.TSInterfaceDeclaration],
          noDefaultSelectors: true
        }
      ]
    },
    {
      code: `
        interface I { readonly value: string[]; }
        interface J { readonly value: readonly string[]; }
      `,
      errors: [
        {
          data: {
            definition: "I > string[]",
            name: "I > Array"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          includeSelectors: [AST_NODE_TYPES.TSInterfaceDeclaration],
          noDefaultSelectors: true
        }
      ]
    },
    {
      code: `
        function f(x: { value: number });
        function g(mutableIdentifier: { value: number });
        function h(identifierMutable: { value: number });
      `,
      errors: [
        {
          data: {
            definition: "{ value: number; }",
            name: "__type"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreIdentifiers: [/^mutable/u.source, /Mutable$/u.source] }]
    },
    {
      code: `
        const x: string[] = [];
        const mutableIdentifier: string[] = [];
        const identifierMutable: string[] = [];
      `,
      errors: [
        {
          data: {
            definition: "string[]",
            name: "Array"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          ignoreIdentifiers: [/^mutable/u.source, /Mutable$/u.source],
          includeSelectors: [AST_NODE_TYPES.Identifier]
        }
      ]
    },
    {
      code: `
        interface I { value: number; }
        interface J { value: number; }
      `,
      errors: [
        {
          data: {
            definition: "I",
            name: "I"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreTypes: ["J"] }]
    },
    {
      code: `
        function f(x: C) {}

        class C {
          value: number;
        }
      `,
      errors: [
        {
          data: {
            definition: "C",
            name: "C"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        interface I { value: number; }
        interface J { value: number; }

        type T1 = I & J;
        type T2 = I | J;
      `,
      errors: [
        {
          data: {
            definition: "I",
            name: "I"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        },
        {
          data: {
            definition: "J",
            name: "J"
          },
          line: 2,
          messageId: "shouldBeReadonly"
        },
        {
          data: {
            definition: "T1 > I",
            name: "? > I"
          },
          line: 4,
          messageId: "shouldBeReadonly"
        },
        {
          data: {
            definition: "T2 > I",
            name: "? > I"
          },
          line: 5,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        function f(x: string[]) {}
        function f(...x: string[]) {}
        function f([x, y]: [string, string]) {}
      `,
      errors: [
        {
          data: {
            definition: "string[]",
            name: "Array"
          },
          line: 1,
          messageId: "shouldBeReadonly"
        }
      ],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        interface I {
          readonly x: string;
          readonly y: string;
        }

        export type J = Pick<I, "x">;
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        function f(x: C) {}

        class C {
          value: number;
        }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreClasses: true }]
    },
    {
      code: `
        interface I<T extends object> {
          readonly value: T;
        }
      `,
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        // eslint-disable-next-line prefer-readonly
        interface I { x: string; }
        interface K extends Readonly<I> {}
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ ignoreInterfaces: true }]
    }
  ]
);
