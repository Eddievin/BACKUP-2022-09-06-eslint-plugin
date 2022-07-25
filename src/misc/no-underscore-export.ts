import * as utils from "../utils";
import { core } from "./core";

export const noUnderscoreExport = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "No underscore exports",
    selector: [
      `ExportNamedDeclaration > :matches(${utils.selectors.function}) > Identifier.id[name=/^_/u]`,
      "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
    ]
  }
]);
