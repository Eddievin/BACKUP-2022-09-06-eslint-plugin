import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const enumerationAlwaysFalse = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to include string, unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=enumeration] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.string,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
