import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "consistent-group-empty-lines",
  rules,
  [
    {
      code: `
        x++;

        x++;

        const a = 1;

        x++;
      `,
      errors: [{ line: 3, messageId: "unexpectedEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { rules: [{ _id: "id", selector: "Program > ExpressionStatement" }] }
      ],
      output: `
        x++;
        x++;

        const a = 1;

        x++;
      `
    },
    {
      code: `
        x;
        x+
        y+
        z;
      `,
      errors: [{ line: 2, messageId: "expectingEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              averageLinesGte: 2,
              selector: "Program > ExpressionStatement"
            }
          ]
        }
      ],
      output: `
        x;

        x+
        y+
        z;
      `
    },
    {
      code: `
        x+
        y;
        x+
        y;
      `,
      errors: [{ line: 3, messageId: "expectingEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              everyLinesGte: 2,
              selector: "Program > ExpressionStatement"
            }
          ]
        }
      ],
      output: `
        x+
        y;

        x+
        y;
      `
    },
    {
      code: `
        x;
        x+
        y+
        z;
      `,
      errors: [{ line: 2, messageId: "expectingEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              selector: "Program > ExpressionStatement",
              someLinesGte: 3
            }
          ]
        }
      ],
      output: `
        x;

        x+
        y+
        z;
      `
    },
    {
      code: `
        {
          x++;

          x++;
        }
      `,
      errors: [{ line: 4, messageId: "unexpectedEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            { _id: "id", selector: "BlockStatement > ExpressionStatement" }
          ]
        }
      ],
      output: `
        {
          x++;
          x++;
        }
      `
    },
    {
      code: `
        interface I {
          x: string;

          y: string;
        }
      `,
      errors: [{ line: 4, messageId: "unexpectedEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ _id: "id", selector: "TSInterfaceBody > *" }] }],
      output: `
        interface I {
          x: string;
          y: string;
        }
      `
    },
    {
      code: `
        interface I {
          x: string;
          /** Comment */
          y: string;
        }
      `,
      errors: [{ line: 4, messageId: "expectingEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            {
              _id: "id",
              selector: "TSInterfaceBody > *",
              someHasDocComment: true
            }
          ]
        }
      ],
      output: `
        interface I {
          x: string;

          /** Comment */
          y: string;
        }
      `
    },
    {
      code: `
        const x = [
          1,

          2,
          3
        ];

        const y = [1, 2];
      `,
      errors: [{ line: 4, messageId: "unexpectedEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ _id: "id", selector: "ArrayExpression > *" }] }],
      output: `
        const x = [
          1,
          2,
          3
        ];

        const y = [1, 2];
      `
    },
    {
      code: `
        const x = [
          {
            value: [1]
          },

          {
            value: [1]
          }
        ];
      `,
      errors: [{ line: 6, messageId: "unexpectedEmptyLine" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ rules: [{ _id: "id", selector: "ArrayExpression > *" }] }],
      output: `
        const x = [
          {
            value: [1]
          },
          {
            value: [1]
          }
        ];
      `
    },
    {
      code: `
        {
          x++;

          x++;
        }

        {
          x++;

          x++;
        }
      `,
      errors: [
        { line: 4, messageId: "unexpectedEmptyLine" },
        { line: 10, messageId: "unexpectedEmptyLine" }
      ],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          rules: [
            { _id: "id", selector: "BlockStatement > ExpressionStatement" }
          ]
        }
      ],
      output: `
        {
          x++;
          x++;
        }

        {
          x++;
          x++;
        }
      `
    }
  ],
  [
    {
      code: `
        const a = 1;
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        { rules: [{ _id: "id", selector: "Program > ExpressionStatement" }] }
      ]
    }
  ]
);
