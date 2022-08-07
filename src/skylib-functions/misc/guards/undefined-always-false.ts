import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const undefinedAlwaysFalse = utils.wrapRule(
  typescript["typescript/no-restricted-syntax"],
  [
    {
      message: "Unnecessary type guard",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=undefined] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.undefined,
        utils.TypeGroup.unknown
      ]
    }
  ]
);
