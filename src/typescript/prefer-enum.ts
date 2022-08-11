import * as utils from "../utils";
import { core } from "./core";

export const preferEnum = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: "Use enum instead",
    selector: [
      "TSTypeAliasDeclaration[typeAnnotation.types.0.literal]",
      "TSTypeAliasDeclaration[typeAnnotation.types.1.literal]",
      "TSTypeAliasDeclaration[typeAnnotation.types.2.literal]"
    ],
    typeIs: utils.TypeGroup.string
  }
]);
