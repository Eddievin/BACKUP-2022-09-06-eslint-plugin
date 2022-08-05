import * as utils from "../utils";
import { core } from "./core";

export const noEmptyInterfaces = utils.wrapRule(core["no-restricted-syntax"], [
  {
    message: "Empty interface is not allowed",
    selector:
      "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > .id"
  }
]);
