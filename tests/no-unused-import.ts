import getCurrentLine from "get-current-line";
import noUnusedImport from "@/rules/no-unused-import";
import * as utils from "@/rules/utils";

utils.testRule(
  "no-unused-import",
  noUnusedImport,
  [
    {
      code: `
        import x1, { x2, x3 as y3, x4 } from "source";
        x1;
        x2;
        y3;
      `,
      errors: [{ line: 1, messageId: "unusedImport" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        import x1, { x2, x3 as y3 } from "source";
        x1;
        x2;
        y3;
      `
    },
    {
      code: `
        import * as x1 from "source1";
        import * as x2 from "source2";
        x1;
      `,
      errors: [{ line: 2, messageId: "unusedImport" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        import * as x1 from "source1";
        x1;
      `
    },
    {
      code: `
        import x1 from "source1";
        import x2 from "source2";
        x1;
      `,
      errors: [{ line: 2, messageId: "unusedImport" }],
      name: `Test at line ${getCurrentLine().line}`,
      output: `
        import x1 from "source1";
        x1;
      `
    }
  ],
  [
    {
      code: `
        import { x } from "source";
        const y = { x };
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
