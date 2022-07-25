import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["typescript/prefer-array-type-alias"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-array-type-alias", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f1(x: string[]) {}
      function f2(x: [string]) {}
      function f3(x: Array<string>) {}
      function f4(x: ReadonlyArray<string>) {}
      function f5(x: any[]) {}
      function f6(x: [any]) {}
      function f7(x: Array<any>) {}
      function f8(x: ReadonlyArray<any>) {}
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);
