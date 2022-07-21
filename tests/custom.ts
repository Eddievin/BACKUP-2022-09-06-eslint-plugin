import { MessageId, custom } from "@/rules/custom";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("custom", custom, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "VElement[name=p]" }],
    code: `
      <template>
        <p>Text</p>
      </template>
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          _id: "id",
          message: "This syntax is not allowed: VElement[name=p]"
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "Identifier" }],
    code: `
      <script lang="ts">
      const id1 = [];
      </script>
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: { message: "This syntax is not allowed: Identifier" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      { replacement: "id2", selector: ["Identifier", "Identifier[name=id1]"] }
    ],
    code: "const id1 = [];",
    output: "const id2 = [];",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: {
          _id: "id",
          message:
            "This syntax is not allowed: Identifier, Identifier[name=id1]"
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        replacement: "e",
        search: /d/u.source,
        selector: ["Identifier"]
      }
    ],
    code: "const id1 = [];",
    output: "const ie1 = [];",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.any]
      }
    ],
    code: "function f(x: any) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.array]
      }
    ],
    code: "function f(x: unknown[]) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.boolean]
      }
    ],
    code: "function f(x: boolean) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.function]
      }
    ],
    code: "function f(x: () => void) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.null]
      }
    ],
    code: "function f(x: null) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.number]
      }
    ],
    code: "function f(x: number) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.object]
      }
    ],
    code: "function f(x: object) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.string]
      }
    ],
    code: "function f(x: string) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.symbol]
      }
    ],
    code: "function f(x: symbol) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.tuple]
      }
    ],
    code: "function f(x: [unknown]) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.undefined]
      }
    ],
    code: "function f(x: undefined) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: [utils.TypeGroup.unknown]
      }
    ],
    code: "function f(x: unknown) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/s$/u]"],
        typeIsNoneOf: [utils.TypeGroup.array]
      }
    ],
    code: `
      const cats = "";
      const dogs = [];
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["CallExpression[callee.name=g] > .arguments"],
        typeHasNoneOf: [utils.TypeGroup.undefined]
      }
    ],
    code: `
      function f(x: string,  y: string | undefined) {
        g(x);
        g(y);
      }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["CallExpression[callee.name=g] > .arguments"],
        typeHasOneOf: [utils.TypeGroup.undefined]
      }
    ],
    code: `
      function f(x: string,  y: string | undefined) {
        g(x);
        g(y);
      }
    `,
    errors: [
      {
        line: 3,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIs: utils.TypeGroup.object
      }
    ],
    code: `
      function f<T extends object>(x: T) {}
      function f<T extends string>(x: T) {}
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIs: utils.TypeGroup.unknown
      }
    ],
    code: `
      function f<T>(x: T) {}
      function f<T extends string>(x: T) {}
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/^x\\d$/u]"],
        typeIs: utils.TypeGroup.complex
      }
    ],
    code: `
      const x1 = { a: 1, b: 2, c: 3 };
      const x2: I = { a: 1, b: 2, c: 3 };
      const x3 = 1;
      const x4 = "";
      const x5 = false;
      const x6 = [1, 2, 3];
      interface I { a: 1, b: 2, c: 3 };
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/^[xy]$/u]"],
        typeIs: utils.TypeGroup.readonly
      }
    ],
    code: `
      const x: { readonly a: number } = { a: 1 };
      const y: { a: number } = { a: 1 };
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        checkReturnType: true,
        message: "Custom message",
        selector: ["Identifier"],
        typeIs: utils.TypeGroup.string
      }
    ],
    code: `
      function f(): string {}
      function g(): number {}
      function h() {}
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["CallExpression"],
        typeIs: utils.TypeGroup.complex
      }
    ],
    code: `
      Object.assign({ a: 1 }, { b: 2 });
      Object.assign({ a: 1 } as I, { b: 2 } as J);
      interface I { a: number }
      interface J { b: number }
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/^[xy]$/u]"],
        typeIs: utils.TypeGroup.complex
      }
    ],
    code: `
      const x = Object.assign({ a: 1 }, { b: 2 });
      const y = Object.assign({ a: 1 } as I, { b: 2 } as J);
      interface I { a: number }
      interface J { b: number }
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/^[xy]$/u]"],
        typeIs: utils.TypeGroup.complex
      }
    ],
    code: `
      const x = [true, { a: 1 }, { b: 2 }];
      const y = [true, { a: 1 } as I, { b: 2 } as J];
      interface I { a: number }
      interface J { b: number }
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/^[xy]$/u]"],
        typeIs: utils.TypeGroup.complex
      }
    ],
    code: `
      const x = [true, { a: 1 }, { b: 2 }] as const;
      const y = [true, { a: 1 } as I, { b: 2 } as J] as const;
      interface I { a: number }
      interface J { b: number }
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  }
]);
