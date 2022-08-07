import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const arrayAlwaysFalse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Expecting type to include array or unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:array|arrayU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.array,
        utils.TypeGroup.object,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
