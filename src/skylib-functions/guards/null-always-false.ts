import * as utils from "../../utils";
import { typescript } from "../../typescript";

export const nullAlwaysFalse = utils.wrapRule(
  typescript["no-restricted-syntax"],
  [
    {
      message: "Expecting type to include null or unknown",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=null] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.null,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
