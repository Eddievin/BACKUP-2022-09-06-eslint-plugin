import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

utils.testRule(
  "prefer-alias-for-array-types",
  rules,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
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
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        type Type = string[];
        function f1<T>(x: []): void {}
        function f2<T>(x: T[]): void {}
        function f3<T>(x: any[]): void {}
        function f4<T>(x: readonly []): void {}
        function f5<T>(x: readonly T[]): void {}
        function f6<T>(x: readonly any[]): void {}
        function f7(x: Type): void {}
      `
    }
  ]
);
