import * as utils from "../utils";
import { core } from "./core";

export const noUnderscoreExport = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: "No underscore exports",
    selector: [
      "ExportNamedDeclaration > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature) > Identifier.id[name=/^_/u]",
      "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
    ]
  }
]);
