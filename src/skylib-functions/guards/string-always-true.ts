import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const stringAlwaysTrue = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include string, unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:string|stringU)$/u] > .arguments:first-child",
    typeIs: utils.TypeGroup.string
  }
]);
