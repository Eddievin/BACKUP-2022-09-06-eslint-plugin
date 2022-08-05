import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const objectAlwaysFalse = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to include object, unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:object|objectU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.object,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
