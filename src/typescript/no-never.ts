import * as utils from "../utils";
import { core } from "./core";

export const noNever = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: "Avoid complex declarator type",
    selector: "Identifier",
    typeIs: utils.TypeGroup.never
  }
]);
