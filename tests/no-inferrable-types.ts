import getCurrentLine from "get-current-line";
import noInferrableTypes from "@/rules/no-inferrable-types";
import * as utils from "@/rules/utils";

utils.testRule("no-inferrable-types", noInferrableTypes, [
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
