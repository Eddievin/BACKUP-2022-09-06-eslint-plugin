import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const trueAlwaysFalse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Always false",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:true|trueU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.boolean,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
