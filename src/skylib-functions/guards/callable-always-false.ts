import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const callableAlwaysFalse = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to include function or unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=callable] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.function,
        utils.TypeGroup.object,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
