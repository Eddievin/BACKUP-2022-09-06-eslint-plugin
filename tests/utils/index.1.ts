import getCurrentLine from "get-current-line";

import classMemberTypedef from "@/rules/class-member-typedef";
import * as utils from "@/rules/utils";

utils.testRule(
  "class-member-typedef",
  classMemberTypedef,
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
