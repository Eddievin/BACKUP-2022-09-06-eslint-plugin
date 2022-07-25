import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const nullAlwaysTrue = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include null or unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=null] > .arguments:first-child",
    typeIs: utils.TypeGroup.null
  }
]);
