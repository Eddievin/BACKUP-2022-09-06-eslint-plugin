import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const emptyAlwaysFalse = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to include null, undefined or unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=empty] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.null,
        utils.TypeGroup.undefined,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
