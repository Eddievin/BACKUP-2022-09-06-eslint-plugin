import * as utils from "../../utils";
import { misc } from "../../misc";

export const consistentExposeArg = utils.wrapRule(misc["restrict-syntax"], [
  {
    message: "Unnecessary argument",
    selector:
      "CallExpression[callee.name=expose] > ObjectExpression[properties.length=0]"
  }
]);
