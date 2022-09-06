import * as utils from "../utils";
import { core } from "./core";

export const classOnlyExport = utils.wrapRule({
  rule: core["prefer-only-export"],
  options: [
    { selector: "Program > ExportNamedDeclaration > ClassDeclaration" }
  ],
  docs: {
    description: "Requires class to be the only export.",
    failExamples: `
      export class SampleClass {}
      export const x = 1;
    `,
    passExamples: "export class SampleClass {}"
  }
});
