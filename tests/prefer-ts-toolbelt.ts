import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "prefer-ts-toolbelt",
  rules,
  [
    {
      code: `
        export type Type<T> = T extends string ? 1 : 0;
      `,
      errors: [{ line: 1, messageId: "preferExtends" }],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        export type Type<T> = T extends { x: infer X } ? X : never;
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
