import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const numberAlwaysFalse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Always false",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:number|numberU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.number,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
