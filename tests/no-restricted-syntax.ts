import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("no-restricted-syntax", rules, [
  {
    code: `
      <template>
        <p>Text</p>
      </template>
    `,
    errors: [
      {
        data: {
          _id: "id",
          message: "This syntax is not allowed: VElement[name=p]"
        },
        line: 2,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "VElement[name=p]" }]
  },
  {
    code: `
      <script lang="ts">
        const id1 = [];
      </script>
    `,
    errors: [
      {
        data: { message: "This syntax is not allowed: Identifier" },
        line: 2,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "Identifier" }]
  },
  {
    code: "const id1 = [];",
    errors: [
      {
        data: {
          _id: "id",
          message:
            "This syntax is not allowed: Identifier, Identifier[name=id1]"
        },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      { replacement: "id2", selector: ["Identifier", "Identifier[name=id1]"] }
    ],
    output: "const id2 = [];"
  },
  {
    code: "const id1 = [];",
    errors: [
      {
        data: { message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        replacement: "e",
        search: /d/u.source,
        selector: ["Identifier"]
      }
    ],
    output: "const ie1 = [];"
  },
  {
    code: "function f(x: any) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["any"]
      }
    ]
  },
  {
    code: "function f(x: unknown[]) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["array"]
      }
    ]
  },
  {
    code: "function f(x: boolean) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["boolean"]
      }
    ]
  },
  {
    code: "function f(x: () => void) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["function"]
      }
    ]
  },
  {
    code: "function f(x: null) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["null"]
      }
    ]
  },
  {
    code: "function f(x: number) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["number"]
      }
    ]
  },
  {
    code: "function f(x: object) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["object"]
      }
    ]
  },
  {
    code: "function f(x: string) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["string"]
      }
    ]
  },
  {
    code: "function f(x: symbol) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["symbol"]
      }
    ]
  },
  {
    code: "function f(x: undefined) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["undefined"]
      }
    ]
  },
  {
    code: "function f(x: unknown) {}",
    errors: [
      { data: { message: "Custom message" }, messageId: "customMessage" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIsOneOf: ["unknown"]
      }
    ]
  },
  {
    code: `
      const cats = "";
      const dogs = [];
    `,
    errors: [
      {
        data: { message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/s$/u]"],
        typeIsNoneOf: ["array"]
      }
    ]
  },
  {
    code: `
      function f(x: string,  y: string | undefined) {
        g(x);
        g(y);
      }
    `,
    errors: [
      {
        data: { message: "Custom message" },
        line: 2,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["CallExpression[callee.name=g] > .arguments"],
        typeHasNoneOf: ["undefined"]
      }
    ]
  },
  {
    code: `
      function f(x: string,  y: string | undefined) {
        g(x);
        g(y);
      }
    `,
    errors: [
      {
        data: { message: "Custom message" },
        line: 3,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["CallExpression[callee.name=g] > .arguments"],
        typeHasOneOf: ["undefined"]
      }
    ]
  },
  {
    code: `
      function f<T extends object>(x: T) {}
      function f<T extends string>(x: T) {}
    `,
    errors: [
      {
        data: { message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIs: "object"
      }
    ]
  },
  {
    code: `
      function f<T>(x: T) {}
      function f<T extends string>(x: T) {}
    `,
    errors: [
      {
        data: { message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=x]"],
        typeIs: "unknown"
      }
    ]
  },
  {
    code: `
      const x1 = () => {};
      const x2: F = () => {};
      const x3 = 1;
      const x4 = "";
      const x5 = false;
      const x6 = [1, 2, 3];
      type F = () => void;
    `,
    errors: [
      {
        data: { message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/^x\\d$/u]"],
        typeIs: "anonymous-function"
      }
    ]
  },
  {
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
        data: { message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        selector: ["Identifier[name=/^x\\d$/u]"],
        typeIs: "anonymous-object"
      }
    ]
  }
]);
