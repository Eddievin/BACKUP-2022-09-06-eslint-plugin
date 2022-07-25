import * as utils from "../utils";
import { core } from "./core";

export const sortCallSignature = utils.wrapRule(core["restrict-syntax"], [
  {
    message: "Call signature should be first",
    selector: "TSInterfaceBody > TSCallSignatureDeclaration:not(:first-child)"
  }
]);
