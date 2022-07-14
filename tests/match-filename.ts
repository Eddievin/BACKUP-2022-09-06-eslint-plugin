import { MessageId, matchFilename } from "@/rules/match-filename";
import getCurrentLine from "get-current-line";
import { utils } from "@";

utils.testRule("match-filename", matchFilename, [
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
      { messageId: MessageId.invalidNodeText, data: { expected: "KebabCase" } }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    filename: "subfolder/index.ts",
    options: [{ selector: "Identifier" }],
    code: `
      export const x = 1;
      export const subfolder = 2;
    `,
    errors: [
      { messageId: MessageId.invalidNodeText, data: { expected: "subfolder" } }
    ]
  }
]);
