import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule(
  "prefer-alias-for-array-types",
  rules,
  [
    {
      code: `
        type Type = () => string[];
        function f(x: string[]): void {}
        function g(x: readonly string[]): void {}
        function h(x: Type): void {}
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
        type Type = string[];
        function f<T>(x: T[]): void {}
        function g<T>(x: readonly T[]): void {}
        function h(x: Type): void {}
      `,
      name: `Test at line ${getCurrentLine().line}`
    }
  ]
);
