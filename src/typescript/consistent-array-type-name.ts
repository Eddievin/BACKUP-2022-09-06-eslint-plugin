import * as utils from "../utils";
import { core } from "./core";

export const consistentArrayTypeName = utils.wrapRule(core["restrict-syntax"], [
  {
    message: 'Array type name should end with "s"',
    selector: "TSTypeAliasDeclaration > Identifier[name=/(?<!Array|[^s]s)$/u]",
    typeIs: utils.TypeGroup.array
  }
]);
