import getCurrentLine from "get-current-line";
import { rules, utils } from "@";

utils.testRule("no-inferrable-types", rules, [
  {
    code: `
      function f<T>(): T {
        const result: T = {} as T;
        return result;
      }

      function g<T>(): T {
        const result = {} as T;
        return result;
      }

      function h<T extends object>(): object {
        const result: object = {} as T;
        return result;
      }
    `,
    errors: [{ line: 2, messageId: "triviallyInferrableType" }],
    name: `Test at line ${getCurrentLine().line}`
  }
]);
