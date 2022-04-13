import getCurrentLine from "get-current-line";
import noUnnecessaryReadonly from "@/rules/no-unnecessary-readonly";
import * as utils from "@/rules/utils";

utils.testRule("no-unnecessary-readonly", noUnnecessaryReadonly, [
  {
    code: `
      interface I {
        readonly value: string;
      }

      function f(
        x: Readonly<I>,
        y: DeepReadonly<I>
      ): void {}
    `,
    errors: [
      { line: 6, messageId: "unnecessaryReadonly" },
      { line: 7, messageId: "unnecessaryReadonly" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      type T2<K extends string, T> = Readonly<Record<K, T>>;
      type T1<K extends string, T> = Readonly<Readonly<Record<K, T>>>;
      type T3<K extends string, T> = Readonly<Readonly2<Record<K, T>>>;
      type T4<K extends string, T> = Readonly<Writable2<Record<K, T>>>;

      export type Readonly2<T> = { +readonly [K in keyof T]: T[K] };
      export type Writable2<T> = { -readonly [K in keyof T]: T[K] };
    `,
    errors: [
      { line: 2, messageId: "unnecessaryReadonly" },
      { line: 3, messageId: "unnecessaryReadonly" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      function f<T extends string>(x: Readonly<T>): void {}

      function g<T>(x: Readonly<T>): void {}
    `,
    errors: [{ line: 1, messageId: "unnecessaryReadonly" }],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
