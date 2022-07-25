import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const setAlwaysFalse = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include object, unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=set] > .arguments:first-child",
    typeHasNoneOf: [
      utils.TypeGroup.any,
      utils.TypeGroup.object,
      utils.TypeGroup.unknown
    ]
  }
]);
