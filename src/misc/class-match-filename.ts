import * as utils from "../utils";
import { core } from "./core";

export const classMatchFilename = utils.wrapRule({
  rule: core["match-filename"],
  options: [
    {
      format: utils.Casing.pascalCase,
      selector: "ClassDeclaration > Identifier.id"
    }
  ],
  docs: {
    description: "Requires class name to match filename",
    failExamples: `
      // filename: kebab-case.ts
      export class ClassName {}
    `,
    passExamples: `
      // filename: kebab-case.ts
      export class KebabCase {}
    `
  }
});
