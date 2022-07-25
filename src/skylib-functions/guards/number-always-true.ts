import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const numberAlwaysTrue = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include number, unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:number|numberU)$/u] > .arguments:first-child",
    typeIs: utils.TypeGroup.number
  }
]);
