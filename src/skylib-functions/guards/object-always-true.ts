import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const objectAlwaysTrue = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include object, unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:object|objectU)$/u] > .arguments:first-child",
    typeIs: utils.TypeGroup.object
  }
]);
