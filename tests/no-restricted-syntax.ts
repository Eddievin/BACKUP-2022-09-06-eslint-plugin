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
    options: [{ rules: [{ _id: "id", selector: "VElement[name=p]" }] }]
  },
  {
    code: `
      <script lang="ts">
        const id1 = [];
      </script>
    `,
    errors: [
      {
        data: { _id: "id", message: "This syntax is not allowed: Identifier" },
        line: 2,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ _id: "id", selector: "Identifier" }] }]
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
      {
        rules: [
          {
            _id: "id",
            replacement: "id2",
            selector: ["Identifier", "Identifier[name=id1]"]
          }
        ]
      }
    ],
    output: "const id2 = [];"
  },
  {
    code: "const id1 = [];",
    errors: [
      {
        data: { _id: "id", message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            message: "Custom message",
            replacement: "e",
            search: /d/u.source,
            selector: ["Identifier"]
          }
        ]
      }
    ],
    output: "const ie1 = [];"
  },
  {
    code: `
      function f(
        x1: any,
        x2: unknown[],
        x3: boolean,
        x4: () => void,
        x5: null,
        x6: number,
        x7: object,
        x8: string,
        x9: symbol,
        xA: undefined,
        xB: unknown
      ) {}
    `,
    errors: [
      {
        data: { _id: "any", message: "Custom message" },
        line: 2,
        messageId: "customMessage"
      },
      {
        data: { _id: "array", message: "Custom message" },
        line: 3,
        messageId: "customMessage"
      },
      {
        data: { _id: "boolean", message: "Custom message" },
        line: 4,
        messageId: "customMessage"
      },
      {
        data: { _id: "function", message: "Custom message" },
        line: 5,
        messageId: "customMessage"
      },
      {
        data: { _id: "null", message: "Custom message" },
        line: 6,
        messageId: "customMessage"
      },
      {
        data: { _id: "number", message: "Custom message" },
        line: 7,
        messageId: "customMessage"
      },
      {
        data: { _id: "object", message: "Custom message" },
        line: 8,
        messageId: "customMessage"
      },
      {
        data: { _id: "string", message: "Custom message" },
        line: 9,
        messageId: "customMessage"
      },
      {
        data: { _id: "symbol", message: "Custom message" },
        line: 10,
        messageId: "customMessage"
      },
      {
        data: { _id: "undefined", message: "Custom message" },
        line: 11,
        messageId: "customMessage"
      },
      {
        data: { _id: "unknown", message: "Custom message" },
        line: 12,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "any",
            message: "Custom message",
            selector: ["Identifier[name=x1]"],
            typeIsOneOf: ["any"]
          },
          {
            _id: "array",
            message: "Custom message",
            selector: ["Identifier[name=x2]"],
            typeIsOneOf: ["array"]
          },
          {
            _id: "boolean",
            message: "Custom message",
            selector: ["Identifier[name=x3]"],
            typeIsOneOf: ["boolean"]
          },
          {
            _id: "function",
            message: "Custom message",
            selector: ["Identifier[name=x4]"],
            typeIsOneOf: ["function"]
          },
          {
            _id: "null",
            message: "Custom message",
            selector: ["Identifier[name=x5]"],
            typeIsOneOf: ["null"]
          },
          {
            _id: "number",
            message: "Custom message",
            selector: ["Identifier[name=x6]"],
            typeIsOneOf: ["number"]
          },
          {
            _id: "object",
            message: "Custom message",
            selector: ["Identifier[name=x7]"],
            typeIsOneOf: ["object"]
          },
          {
            _id: "string",
            message: "Custom message",
            selector: ["Identifier[name=x8]"],
            typeIsOneOf: ["string"]
          },
          {
            _id: "symbol",
            message: "Custom message",
            selector: ["Identifier[name=x9]"],
            typeIsOneOf: ["symbol"]
          },
          {
            _id: "undefined",
            message: "Custom message",
            selector: ["Identifier[name=xA]"],
            typeIsOneOf: ["undefined"]
          },
          {
            _id: "unknown",
            message: "Custom message",
            selector: ["Identifier[name=xB]"],
            typeIsOneOf: ["unknown"]
          }
        ]
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
        data: { _id: "id", message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            message: "Custom message",
            selector: ["Identifier[name=/s$/u]"],
            typeIsNoneOf: ["array"]
          }
        ]
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
        data: { _id: "id", message: "Custom message" },
        line: 2,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            message: "Custom message",
            selector: ["CallExpression[callee.name=g] > .arguments"],
            typeHasNoneOf: ["undefined"]
          }
        ]
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
        data: { _id: "id", message: "Custom message" },
        line: 3,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            message: "Custom message",
            selector: ["CallExpression[callee.name=g] > .arguments"],
            typeHasOneOf: ["undefined"]
          }
        ]
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
        data: { _id: "id", message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            message: "Custom message",
            selector: ["Identifier[name=x]"],
            typeIs: "object"
          }
        ]
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
        data: { _id: "id", message: "Custom message" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            message: "Custom message",
            selector: ["Identifier[name=x]"],
            typeIs: "unknown"
          }
        ]
      }
    ]
  }
]);
