import getCurrentLine from "get-current-line";
import className from "@/rules/class-name";
import * as utils from "@/rules/utils";

utils.testRule(
  "class-name",
  className,
  [
    {
      code: `
        export class ClassName {}
        export class file {}
        export const x = class {};
      `,
      errors: [{ line: 1, messageId: "invalidClassName" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `

        class ClassName {}
        class file {}
        const x = class {};
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
