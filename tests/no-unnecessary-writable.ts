import getCurrentLine from "get-current-line";

import noUnnecessaryWritable from "@/rules/no-unnecessary-writable";
import * as utils from "@/rules/utils";

utils.testRule("no-unnecessary-writable", noUnnecessaryWritable, [
  {
    code: `
      interface I {
        value: string;
      }

      function f(
        x: Writable<I>,
        y: DeepWritable<I>
      ): void {}
    `,
    errors: [
      { line: 6, messageId: "unnecessaryWritable" },
      { line: 7, messageId: "unnecessaryWritable" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      type T1<K extends string, T> = Writable<Record<K, T>>;
      type T2<K extends string, T> = Writable<Writable<Record<K, T>>>;
      type T3<K extends string, T> = Writable<Writable2<Record<K, T>>>;
      type T4<K extends string, T> = Writable<Readonly2<Record<K, T>>>;

      export type Readonly2<T> = { +readonly [K in keyof T]: T[K] };
      export type Writable2<T> = { -readonly [K in keyof T]: T[K] };
    `,
    errors: [
      { line: 2, messageId: "unnecessaryWritable" },
      { line: 3, messageId: "unnecessaryWritable" }
    ],
    name: `Test at line ${getCurrentLine().line}`
  },
  {
    code: `
      function f<T extends string>(x: Writable<T>): void {}

      function g<T>(x: Writable<T>): void {}
    `,
    errors: [{ line: 1, messageId: "unnecessaryWritable" }],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
