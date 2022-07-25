import * as utils from "../utils";
import { core } from "./core";

export const preferEnum = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Use enum instead",
    selector:
      "TSTypeAliasDeclaration > TSUnionType > TSLiteralType:first-child",
    typeIs: utils.TypeGroup.string
  }
]);
