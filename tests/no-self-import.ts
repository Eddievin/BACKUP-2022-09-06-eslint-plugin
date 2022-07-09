import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule("no-self-import", rules, [
  {
    code: `
      import * as x from "./file.ts";
      import * as x from "./file";
      import * as x from "./source";
      import * as x from "@/file.ts";
      import * as x from "@/file";
      import * as x from "@/source";
    `,
    errors: [
      { line: 1, messageId: "selfImportDisallowed" },
      { line: 2, messageId: "selfImportDisallowed" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      import * as x from "./file.extras.ts";
      import * as x from "./file.extras";
      import * as x from "./file";
      import * as x from "@/file.extras.ts";
      import * as x from "@/file.extras";
      import * as x from "@/file";
    `,
    errors: [
      { line: 1, messageId: "selfImportDisallowed" },
      { line: 2, messageId: "selfImportDisallowed" }
    ],
    filename: "file.extras.ts",
    name: `Test at line ${getCurrentLine().line}`
  }
]);
