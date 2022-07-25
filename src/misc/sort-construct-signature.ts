import * as utils from "../utils";
import { core } from "./core";

export const sortConstructSignature = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Construct signature should be first",
    selector:
      "TSInterfaceBody > TSConstructSignatureDeclaration:not(:first-child)"
  }
]);
