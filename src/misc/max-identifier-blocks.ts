import * as utils from "../utils";
import { core } from "./core";

export const maxIdentifierBlocks = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Identifier should not contain more than 4 blocks",
    selector: `:matches(${utils.selectors.function}, ${utils.selectors.property}, VariableDeclarator) > Identifier[name=/^[A-Z]*[^A-Z]+([^A-Z]+[A-Z]+){4}/u]`
  }
]);