import * as utils from "../utils";
import { core } from "./core";

export const consistentArrayTypeName = utils.wrapRule(
  core["no-restricted-syntax"],
  [
    {
      message: 'Prefer array type name to end with "s" or "Array" suffix',
      selector:
        "TSTypeAliasDeclaration > Identifier[name=/(?<![^s]s|Array)$/u]",
      typeIs: utils.TypeGroup.array
    }
  ]
);
