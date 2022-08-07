import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const symbolAlwaysFalse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Unnecessary type guard",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:symbol|symbolU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.symbol,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
