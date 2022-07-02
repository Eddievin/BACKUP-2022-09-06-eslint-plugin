import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("no-restricted-syntax", rules, [
  {
    code: "const id1 = [];",
    errors: [
      {
        data: {
          message: "This syntax is not allowed: Identifier",
          subOptionsId: "id"
        },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ rules: [{ selector: "Identifier", subOptionsId: "id" }] }]
  },
  {
    code: "const id1 = [];",
    errors: [
      {
        data: {
          message:
            "This syntax is not allowed: Identifier, Identifier[name=id1]",
          subOptionsId: "id"
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
            replacement: "id2",
            selector: ["Identifier", "Identifier[name=id1]"],
            subOptionsId: "id"
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
        data: { message: "Custom message", subOptionsId: "id" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            message: "Custom message",
            replacement: "e",
            search: /d/u.source,
            selector: ["Identifier"],
            subOptionsId: "id"
          }
        ]
      }
    ],
    output: "const ie1 = [];"
  },
  {
    code: `
      const cats = "";
      const dogs = [];
    `,
    errors: [
      {
        data: { message: "Custom message", subOptionsId: "id" },
        line: 1,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            message: "Custom message",
            selector: ["Identifier[name=/s$/u]"],
            subOptionsId: "id",
            typeNeq: "array"
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
        data: { message: "Custom message", subOptionsId: "id" },
        line: 2,
        messageId: "customMessage"
      }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            message: "Custom message",
            selector: ["CallExpression[callee.name=g] > .arguments"],
            subOptionsId: "id",
            typeDontContain: "undefined"
          }
        ]
      }
    ]
  }
]);
