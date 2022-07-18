import {
  EmptyLine,
  MessageId,
  consistentEmptyLines
} from "@/rules/consistent-empty-lines";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("consistent-empty-lines", consistentEmptyLines, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id1",
            emptyLine: EmptyLine.always,
            next: ":statement, TSExportAssignment",
            prev: ":statement, TSExportAssignment"
          },
          {
            _id: "id2",
            emptyLine: EmptyLine.never,
            next: "ImportDeclaration",
            prev: "ImportDeclaration"
          }
        ]
      }
    ],
    code: `
      import x from "source1";

      import y from "source2";
      export = 1;
    `,
    output: `
      import x from "source1";
      import y from "source2";

      export = 1;
    `,
    errors: [
      { line: 3, messageId: MessageId.unexpectedEmptyLine },
      { line: 4, messageId: MessageId.expectingEmptyLine }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id1",
            emptyLine: EmptyLine.always,
            next: ":statement, TSExportAssignment",
            prev: ":statement, TSExportAssignment"
          },
          {
            _id: "id2",
            emptyLine: EmptyLine.any,
            next: "ImportDeclaration",
            prev: "ImportDeclaration"
          }
        ]
      }
    ],
    code: `
      import x from "source1";

      import y from "source2";
      export = 1;
    `,
    output: `
      import x from "source1";

      import y from "source2";

      export = 1;
    `,
    errors: [{ line: 4, messageId: MessageId.expectingEmptyLine }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id",
            emptyLine: EmptyLine.always,
            next: ":statement",
            prev: ":statement"
          }
        ]
      }
    ],
    code: `
      const x = 1;
      {
        const y = 2;
        const z = 3;
      }
    `,
    output: `
      const x = 1;

      {
        const y = 2;

        const z = 3;
      }
    `,
    errors: [
      {
        line: 2,
        endLine: 5,
        messageId: MessageId.expectingEmptyLine
      },
      { line: 4, messageId: MessageId.expectingEmptyLine }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "id1",
            emptyLine: EmptyLine.always,
            next: ":statement",
            prev: ":statement"
          },
          {
            _id: "id2",
            emptyLine: EmptyLine.never,
            next: "ExpressionStatement",
            prev: "ExpressionStatement"
          }
        ]
      }
    ],
    code: `
      if (1) {}
      x = 1;

      y = 2;
    `,
    output: `
      if (1) {}

      x = 1;
      y = 2;
    `,
    errors: [
      { line: 2, messageId: MessageId.expectingEmptyLine },
      { line: 4, messageId: MessageId.unexpectedEmptyLine }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            _id: "statement",
            emptyLine: EmptyLine.always,
            next: ":matches(:statement, TSDeclareFunction, TSExportAssignment)",
            prev: ":matches(:statement, TSDeclareFunction, TSExportAssignment)"
          },
          {
            _id: "ExpressionStatement",
            emptyLine: EmptyLine.any,
            next: "ExpressionStatement",
            prev: "ExpressionStatement"
          }
        ]
      }
    ],
    code: `
      {
        if (1) {}
        x = 1;

        y = 2;
      }
    `,
    output: `
      {
        if (1) {}

        x = 1;

        y = 2;
      }
    `,
    errors: [{ line: 3, messageId: MessageId.expectingEmptyLine }]
  }
]);
