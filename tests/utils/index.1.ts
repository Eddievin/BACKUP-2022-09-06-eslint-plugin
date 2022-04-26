import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "class-member-typedef",
  rules,
  [
    {
      code: `
        class C {
          x;
          constructor() {
            this.x = 1;
          }
        }
      `,
      errors: [{ line: 2, messageId: "typedefRequired" }],
      name: `Test at line ${getCurrentLine().line}`
    },
    {
      code: `
        class C {
          x;
          constructor() {
            this.x = 1;
          }
        }
      `,
      errors: [{ line: 2, messageId: "typedefRequired" }],
      name: `Test at line ${getCurrentLine().line}`,
      options: [
        {
          filesToLint: ["./fixtures/file.ts"],
          filesToSkip: ["./fixtures/**", "./other/**"]
        }
      ]
    }
  ],
  [
    {
      code: `
        class C {
          x;
          constructor() {
            this.x = 1;
          }
        }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ filesToSkip: ["./fixtures/**"] }]
    },
    {
      code: `
        class C {
          x;
          constructor() {
            this.x = 1;
          }
        }
      `,
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ filesToLint: ["./other/**"] }]
    }
  ]
);
