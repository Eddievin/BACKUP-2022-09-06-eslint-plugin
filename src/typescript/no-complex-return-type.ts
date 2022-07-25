import * as utils from "../utils";
import { core } from "./core";

export const noComplexReturnType = utils.wrapRule(core["restrict-syntax"], [
  {
    checkReturnType: true,
    message: "Avoid complex return type",
    selector: `:matches(${utils.selectors.function})`,
    typeIs: utils.TypeGroup.complex
  }
]);
