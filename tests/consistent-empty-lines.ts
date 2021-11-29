import getCurrentLine from "get-current-line";

import consistentEmptyLines from "@/rules/consistent-empty-lines";
import * as utils from "@/rules/utils";

utils.testRule("consistent-empty-lines", consistentEmptyLines, [
  {
    code: `
      import x from "source1";

      import y from "source2";
      export = 1;
    `,
    errors: [
      { line: 3, messageId: "unexpectedEmptyLine" },
      { line: 4, messageId: "expectingEmptyLine" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            emptyLine: "always",
            next: ":statement, TSExportAssignment",
            prev: ":statement, TSExportAssignment"
          },
          {
            emptyLine: "never",
            next: "ImportDeclaration",
            prev: "ImportDeclaration"
          }
        ]
      }
    ],
    output: `
      import x from "source1";
      import y from "source2";

      export = 1;
    `
  },
  {
    code: `
      import x from "source1";

      import y from "source2";
      export = 1;
    `,
    errors: [{ line: 4, messageId: "expectingEmptyLine" }],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            emptyLine: "always",
            next: ":statement, TSExportAssignment",
            prev: ":statement, TSExportAssignment"
          },
          {
            emptyLine: "any",
            next: "ImportDeclaration",
            prev: "ImportDeclaration"
          }
        ]
      }
    ],
    output: `
      import x from "source1";

      import y from "source2";

      export = 1;
    `
  },
  {
    code: `
      const x = 1;
      {
        const y = 2;
        const z = 3;
      }
    `,
    errors: [
      { line: 2, messageId: "expectingEmptyLine" },
      { line: 4, messageId: "expectingEmptyLine" }
    ],
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        rules: [
          {
            emptyLine: "always",
            next: ":statement",
            prev: ":statement"
          }
        ]
      }
    ],
    output: `
      const x = 1;

      {
        const y = 2;

        const z = 3;
      }
    `
  }
]);
