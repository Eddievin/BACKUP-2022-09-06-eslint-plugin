import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "class-name",
  rules,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        export class ClassName {}
        export class file {}
        export const x = class {};
      `,
      errors: [{ line: 1, messageId: "invalidClassName" }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        class ClassName {}
        class file {}
        const x = class {};
      `
    }
  ]
);
