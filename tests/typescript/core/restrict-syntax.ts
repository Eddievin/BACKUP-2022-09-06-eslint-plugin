import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["typescript/restrict-syntax"];

const MessageId = utils.getMessageId(rule);

utils.testRule("restrict-syntax", rule, [
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.any
      }
    ],
    code: "var id: any;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.array
      }
    ],
    code: "var id: string[];",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.boolean
      }
    ],
    code: "var id: boolean;",
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
        selector: ["Identifier[name=/^id\\w$/u]"],
        typeIs: utils.TypeGroup.complex
      }
    ],
    code: `
      var id1: { value: string };
      var id3: { value: string } & string;
      var id2: { value: string } | string;
      var id4: [{ value: string }];
      var id5: Array<{ value: string }>;
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      },
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      },
      {
        line: 3,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      },
      {
        line: 4,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      },
      {
        line: 5,
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.function
      }
    ],
    code: "var id: () => void;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.never
      }
    ],
    code: "var id: never;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.null
      }
    ],
    code: "var id: null;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.number
      }
    ],
    code: "var id: number;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.object
      }
    ],
    code: "var id: object;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.readonly
      }
    ],
    code: "var id: { readonly value: string };",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.string
      }
    ],
    code: "var id: string;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.symbol
      }
    ],
    code: "var id: symbol;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.tuple
      }
    ],
    code: "var id: [string];",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.undefined
      }
    ],
    code: "var id: undefined;",
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
        selector: ["Identifier[name=id]"],
        typeIs: utils.TypeGroup.unknown
      }
    ],
    code: "var id: unknown;",
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
        selector: ["Identifier[name=/^id\\w$/u]"],
        typeHasOneOf: [utils.TypeGroup.number, utils.TypeGroup.string]
      }
    ],
    code: `
      var id1: number;
      var id2: string;
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      },
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
        selector: ["Identifier[name=x]"],
        typeIs: utils.TypeGroup.number
      }
    ],
    code: `
      function f<T extends number>(x: T) {}
      function g<T extends number | string>(x: T) {}
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
    code: "function f<T>(x: T) {}",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  }
]);
