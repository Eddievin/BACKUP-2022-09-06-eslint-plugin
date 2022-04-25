import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "prefer-alias-for-array-types",
  rules,
  [
    {
      code: `
        type Type = () => string[];
        function f(x: string[]) {}
        function g(x: readonly string[]) {}
      `,
      errors: [
        { line: 1, messageId: "preferAlias" },
        { line: 2, messageId: "preferAlias" },
        { line: 3, messageId: "preferAlias" }
      ],
      name: `Test at line ${getCurrentLine().line}`
    }
  ],
  [
    {
      code: `
        type Type = number[];
        function f<T>(x: T[]) {}
        function g<T>(x: readonly T[]) {}
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
