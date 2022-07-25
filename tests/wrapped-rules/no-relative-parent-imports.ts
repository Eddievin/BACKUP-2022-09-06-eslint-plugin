import {
  MessageId,
  noRelativeParentImports
} from "@/wrapped-rules/no-relative-parent-imports";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("no-relative-parent-imports", noRelativeParentImports, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    filename: "kebab-case.ts",
    options: [{ allow: ["../allowed-source"] }],
    code: `
      import * as x from "../source";
      import * as y from "../allowed-source";
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.disallowedSource,
        data: { expected: "KebabCase" }
      }
    ]
  }
]);
