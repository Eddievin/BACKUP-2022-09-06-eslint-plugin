import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const stringAlwaysFalse = utils.wrapRule(typescript["restrict-syntax"], [
  {
    message: "Expecting type to include string, unknown",
    selector:
      "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:string|stringU)$/u] > .arguments:first-child",
    typeHasNoneOf: [
      utils.TypeGroup.any,
      utils.TypeGroup.string,
      utils.TypeGroup.unknown
    ]
  }
]);