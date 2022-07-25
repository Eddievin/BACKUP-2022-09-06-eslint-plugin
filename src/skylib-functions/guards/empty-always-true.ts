import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const emptyAlwaysTrue = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include null, undefined or unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=empty] > .arguments:first-child",
    typeIsOneOf: [utils.TypeGroup.null, utils.TypeGroup.undefined]
  }
]);
