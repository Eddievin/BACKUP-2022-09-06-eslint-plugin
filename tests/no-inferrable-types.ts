import { MessageId, noInferrableTypes } from "@/rules/no-inferrable-types";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("no-inferrable-types", noInferrableTypes, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f<T>() { const result: T = {} as T; }
      function g<T>() { const result = {} as T; }
      function h<T extends object>() { const result: object = {} as T; }
    `,
    errors: [{ line: 1, messageId: MessageId.triviallyInferrableType }]
  }
]);
