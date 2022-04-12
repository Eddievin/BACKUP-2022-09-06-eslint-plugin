import getCurrentLine from "get-current-line";

import preferTsToolbelt from "@/rules/prefer-ts-toolbelt";
import * as utils from "@/rules/utils";

export type Type<T> = T extends string ? 1 : 0;

utils.testRule(
  "prefer-ts-toolbelt",
  preferTsToolbelt,
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
