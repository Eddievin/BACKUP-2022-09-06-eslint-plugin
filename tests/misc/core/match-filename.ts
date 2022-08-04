import * as utils from "@/utils";
import getCurrentLine from "get-current-line";
import { rules } from "@";

const rule = rules["match-filename"];

const MessageId = utils.getMessageId(rule);

utils.testRule("match-filename", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    filename: "subfolder/index.ts",
    options: [{ selector: "Identifier" }],
    code: `
      export const x = 1;
      export const subfolder = 2;
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.invalidText,
        data: { expected: "subfolder" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    filename: "kebab-case.ts",
    options: [
      { format: utils.casing.Format.pascalCase, selector: "Identifier" }
    ],
    code: `
      export class ClassName {}
      export class KebabCase {}
    `,
    errors: [
      {
        line: 1,
        messageId: MessageId.invalidText,
        data: { expected: "KebabCase" }
      }
    ]
  }
]);